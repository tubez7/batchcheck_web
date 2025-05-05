<script>
  // IMPORTS
  import { goto } from "$app/navigation";
  import {
    dataImported,
    savedMatchValuesData,
    savedStyleSettings,
    savedTableValues,
    tableStoreData,
    totalRowsStored,
  } from "$lib/stores";
  import {
    createTableData,
    createTableStyleObject,
    createValueMatchDataObject,
    parseTableColumns,
  } from "$lib/utils.js";
  import { onMount } from "svelte";
  import { get } from "svelte/store";
  // COMPONENTS
  import Jspreadsheet from "$lib/components/Jspreadsheet.svelte";
  import PopUp from "$lib/components/PopUp.svelte";
  import WarningAlert from "$lib/components/WarningAlert.svelte";

  // PROPS
  export let data;

  // VARIABLES
  let receivedData = get(tableStoreData);
  let totalRows = get(totalRowsStored);
  let dataFromFile = get(dataImported);
  let darkMode = false;
  let columns = parseTableColumns(receivedData);
  let fieldTypes = receivedData.map((field) => field.type);
  let styleSettings;
  let tableData;
  let matchValuesData;
  $: dataLoaded = false;
  let userCreatedData = receivedData.length > 0;
  $: warningPopUpVisible = false;
  let userConfirmation = false;
  let alert = "All table data will be permanently lost";
  let jsonSaveData;
  let exportData = false;
  let updateCompleted = false;

  async function loadData() {
    if (!dataFromFile) {
      tableData = await createTableData(totalRows, receivedData);
      styleSettings = await createTableStyleObject(
        totalRows,
        receivedData,
        darkMode
      );
      matchValuesData = await createValueMatchDataObject(
        totalRows,
        receivedData
      );
    } else {
      tableData = get(savedTableValues);
      styleSettings = get(savedStyleSettings);
      matchValuesData = get(savedMatchValuesData);
    }
    dataLoaded = true;
  }

  onMount(() => {
    loadData();
  });

  function goBack(e) {
    e.preventDefault();
    goto("/");
  }

  function reset(e) {
    e.preventDefault();
    if (dataLoaded && userCreatedData) {
      warningPopUpVisible = true;
    } else {
      userConfirmed(true);
    }
  }

  function userConfirmed(confirmed) {
    if (confirmed) {
      tableStoreData.set([]);
      totalRowsStored.set(1);
      goto("/");
    }
  }

  function confirmExport(e) {
    e.preventDefault();
    exportData = true;
  }

  function downloadJSONBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  async function createAndExportJSON(updated) {
    if (updated) {
      jsonSaveData.tableName = `${data.tableName}.json`;
      jsonSaveData.fields = receivedData;
      jsonSaveData.totalRows = totalRows;
      const jsonString = JSON.stringify(jsonSaveData, null, 2);
      const blob = new Blob([jsonString], { type: "application/json" });

      if (window.showSaveFilePicker) {
        // if browser supports
        const options = {
          startIn: "downloads",
          suggestedName: data.tableName,
          types: [
            {
              description: "JSON file",
              accept: { "application/json": [".json"] },
            },
          ],
        };
        try {
          const fileHandle = await window.showSaveFilePicker(options);
          const fileStream = await fileHandle.createWritable();
          await fileStream.write(blob);
          await fileStream.close();
        } catch (error) {
          if (error.code !== 20) {
            console.error("File save failed:", error);
          } else {
            console.log("file save aborted by user");
          }
        }
      } else {
        // Fallback for unsupported browsers
        downloadJSONBlob(blob, `${data.tableName}.json`);
      }
      updateCompleted = false;
    }
  }

  $: userConfirmation, userConfirmed(userConfirmation);
  $: updateCompleted, createAndExportJSON(updateCompleted);
</script>

<div id="background-colour"></div>

{#if warningPopUpVisible}
  <div id="opaque-filter"></div>
  <PopUp --colour="rgb(250, 128, 128)" header="WARNING!">
    <WarningAlert bind:warningPopUpVisible bind:userConfirmation {alert} />
  </PopUp>
{/if}

<main class="app-window">
  {#if userCreatedData}
    <h1>{data.tableName}</h1>
  {/if}
  <div class="button-block">
    <button id="back" on:click={goBack} {warningPopUpVisible}
      >EDIT TABLE DATA</button
    >
    <button id="reset" on:click={reset} {warningPopUpVisible}>RESET</button>
    <button id="save" on:click={confirmExport} {warningPopUpVisible}
      >EXPORT TABLE DATA</button
    >
  </div>

  {#if dataLoaded && userCreatedData}
    <div class="table-container">
      <Jspreadsheet
        {columns}
        {tableData}
        {styleSettings}
        {matchValuesData}
        {fieldTypes}
        {darkMode}
        bind:jsonSaveData
        bind:exportData
        bind:updateCompleted
      />
    </div>
  {:else if dataLoaded}
    <h1>ERROR: TABLE DATA HAS NOT BEEN GENERATED</h1>
    <p>Please create table data via the Batch-Check Constructor</p>
  {:else if userCreatedData}
    <h1>ERROR: TABLE DATA HAS NOT BEEN LOADED</h1>
    <p>
      There was a problem loading your table. Please return to the editor and
      regenerate/re-load the table data.
    </p>
  {:else if !dataLoaded}
    <p>Loading your table. Please wait....</p>
  {/if}
</main>

<style>
  button {
    height: 5em;
    width: 15em;
    margin-left: 0.5em;
    margin-right: 0.5em;
    border-radius: 1em;
    cursor: pointer;
    box-shadow: 0 5px #999;
    background-color: rgb(255, 188, 122);
  }

  #back:hover {
    background-color: var(--hover1, rgb(210, 153, 96));
  }

  #reset:hover {
    background-color: var(--hover1, rgb(250, 128, 128));
  }

  .table-container {
    margin: 1rem;
    margin-left: 0;
    background-color: rgb(228, 201, 162);
    padding: 1em;
    padding-top: 1.25em;
    width: fit-content;
    border-style: dotted;
    border-radius: 5px;
  }

  #background-colour {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    background-color: rgb(245, 245, 220);
    margin: 0;
    padding: 0;
  }

  #opaque-filter {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    z-index: 3;
    background-color: black;
    filter: opacity(85%);
  }
</style>
