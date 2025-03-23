<script>
  // IMPORTS
  import { goto } from "$app/navigation";
  import { tableStoreData, totalRowsStored } from "$lib/stores";
  import { parseTableColumns, createTableStyleObject, createTableData, createValueMatchDataObject } from "$lib/utils.js";
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
  let styleSettings = createTableStyleObject(totalRows, receivedData, darkMode);
  let tableData = createTableData(totalRows, receivedData);
  let matchValuesData = createValueMatchDataObject(totalRows, receivedData);

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

<h1>Table: {data.tableName}</h1>

<p>THIS PART OF THE APP IS STILL UNDER CONSTRUCTION AND IS NOT FULLY FUNCTIONAL.</p>
<p>Please check back once completed alpha build is completed and available for testing.</p>

<Jspreadsheet {columns} {tableData} {styleSettings} {matchValuesData} />

<div>
  <button on:click={toggleTheme}>{buttonText}</button>
  <button on:click={goBack}>RETURN TO EDITOR</button>
</div>
