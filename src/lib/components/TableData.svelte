<script>
  // IMPORTS
  import { goto } from "$app/navigation";
  import { tableStoreData, totalRowsStored } from "$lib/stores";
  import { parseTableColumns, createTableStyleObject } from "$lib/utils.js";
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

  //console.log(columns);

  let tableData = [
    ["ROW 1 - VALUE 1", "ROW 1 - VALUE 2"],
    ["ROW 2 - VALUE 1", "ROW 2 - VALUE 2"],
  ];

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
<p>This part of the app is still under construction. Please check back soon!</p>
{#each receivedData as column, i}
  <ul>
    <li>
      <p>{i} - {column.name}</p>
    </li>
  </ul>
{/each}

<Jspreadsheet {columns} {tableData} {styleSettings} />

<div>
  <button on:click={toggleTheme}>{buttonText}</button>
  <button on:click={goBack}>RETURN TO EDITOR</button>
</div>
