<script>
  // IMPORTS
  import { goto } from "$app/navigation";
  import { tableStoreData, totalRowsStored } from "$lib/stores";
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

  // PROPS
  export let data;

  // VARIABLES
  let receivedData = get(tableStoreData);
  let totalRows = get(totalRowsStored);
  $: darkMode = false;
  $: buttonText = darkMode ? "LIGHT MODE" : "DARK MODE";
  let columns = parseTableColumns(receivedData);
  let fieldTypes = receivedData.map((field) => field.type);
  //console.log("fieldTypes = ", fieldTypes);
 // $: columns = parseTableColumns(receivedData);
  //console.log("loaded cols ", columns);
  let styleSettings;
  let tableData;
  let matchValuesData;
  $: dataLoaded = false;

  // $: console.log("data loaded = ", dataLoaded);
  // $: console.log("columns = ", columns);
  // $: console.log("tableData = ", tableData);
  // $: console.log("matchValuesData = ", matchValuesData);
  // $: console.log("styleSettings = ", styleSettings);

  async function loadData() {
    tableData = await createTableData(totalRows, receivedData);
    styleSettings = await createTableStyleObject(
      totalRows,
      receivedData,
      darkMode
    );
    matchValuesData = await createValueMatchDataObject(totalRows, receivedData);
    dataLoaded = true;
  }

  onMount(() => {
    loadData();
  });

  // FUNCTIONS
  function toggleTheme(e) {
    e.preventDefault();
    darkMode = !darkMode;
  }

  function goBack(e) {
    e.preventDefault();
    goto("/");
  }
  console.log("received", receivedData);
</script>

<h1>{data.tableName}</h1>

<p>
  THIS PART OF THE APP IS STILL UNDER CONSTRUCTION AND IS NOT FULLY FUNCTIONAL.
</p>
<p>
  Please check back once completed alpha build is completed and available for
  testing.
</p>

{#if dataLoaded}
  <Jspreadsheet {columns} {tableData} {styleSettings} {matchValuesData} {fieldTypes} {darkMode} />
{/if}

<div>
  <button on:click={toggleTheme}>{buttonText}</button>
  <button on:click={goBack}>RETURN TO EDITOR</button>
</div>
