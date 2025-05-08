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
  import { validateJsonFile } from "$lib/utils.js";
  // COMPONENTS
  import FieldsetStyle from "$lib/components/FieldsetStyle.svelte";
  import TwoButtons from "$lib/components/TwoButtons.svelte";

  // PROPS
  export let tableGeneratePopUp;
  export let disabled;
  export let editMode;
  export let formValidated;

  // VARIABLES
  let importedName;
  let cleanedName;
  let importedFields;
  let importedTotalRows;
  let importedTableData;
  let importedStyleData;
  let importedMatchValuesData;
  let fileInputElement;
  let dataValidated;
  let errorMsg = "";
  $: fileError = errorMsg.length > 0;

  // FUNCTIONS
  function toggleEditMode(e) {
    e.preventDefault();
    editMode = !editMode;
  }

  function openTableNamePopUp(e) {
    e.preventDefault();
    tableGeneratePopUp = true;
  }

  function triggerFileLoad(e) {
    e.preventDefault();
    fileInputElement.click();
  }

  function setTableData() {
    cleanedName = encodeURIComponent(importedName);
    tableStoreData.set(importedFields);
    totalRowsStored.set(importedTotalRows);
    savedTableValues.set(importedTableData);
    savedStyleSettings.set(importedStyleData);
    savedMatchValuesData.set(importedMatchValuesData);
    dataImported.set(true);
    goto(`/${cleanedName}`);
  }

  function handleFileSelection(e) {
    const selectedFile = e.target.files[0];
    if (!selectedFile) {
      errorMsg = "NO FILE LOADED";
      return;
    } else {
      if (!selectedFile.name.toLowerCase().endsWith(".json")) {
        errorMsg = "Please select a valid .json file.";
        return;
      } else {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const jsonData = JSON.parse(event.target.result);
            //console.log("JSON data = ", jsonData); // delete after tests complete
            // VALIDATE HELPER FUNCTION HERE
            // check props of the saved data object
            // check has properties
            // check values of properties are what is expected
            dataValidated = validateJsonFile(jsonData);
            if (dataValidated) {
              importedName = jsonData.tableName;
              importedFields = jsonData.fields;
              importedTotalRows = jsonData.totalRows;
              importedTableData = jsonData.tableData;
              importedStyleData = jsonData.styleSettings;
              importedMatchValuesData = jsonData.matchValuesData;
              setTableData();
            } else {
              errorMsg =
                "Invalid Batch-Check JSON data loaded. Please try loading another file.";
            }
          } catch (err) {
            errorMsg = "Failed to read JSON file.";
            console.error(err);
          }
        };

        reader.readAsText(selectedFile);
      }
    }
  }
</script>

<FieldsetStyle --background="rgb(222, 222, 177)">
  <div class="button-block">
    <button
      id="load-button"
      type="button"
      on:click={triggerFileLoad}
      disabled={editMode}>LOAD DATA</button
    >
    <TwoButtons
      callbackFunc1={openTableNamePopUp}
      callbackFunc2={toggleEditMode}
      button1text="GENERATE TABLE"
      button2text={editMode ? "CREATE FIELDS" : "EDIT FIELDS"}
      disableButton1={!formValidated}
      disableButton2={disabled}
      type1="submit"
      type2="button"
    />
  </div>
  {#if fileError}
    <p class="error-msg">{errorMsg}</p>
  {/if}
</FieldsetStyle>
<input
  id="file-picker"
  bind:this={fileInputElement}
  on:change={handleFileSelection}
  type="file"
  accept=".json"
/>

<style>
  .button-block {
    text-align: center;
  }

  #file-picker {
    display: none;
  }

  #load-button {
    height: 3em;
    width: 10em;
    margin-left: 0.5em;
    margin-right: 0.5em;
    border-radius: 1em;
    cursor: pointer;
    box-shadow: 0 5px #999;
  }

  #load-button:hover {
    background-color: var(--hover1, rgb(207, 207, 207));
  }

  #load-button:active {
    box-shadow: 0 2px #666;
    transform: translateY(4px);
  }
  .error-msg {
    color: red;
    font-weight: bolder;
    text-align: center;
    margin-bottom: 0;
  }
</style>
