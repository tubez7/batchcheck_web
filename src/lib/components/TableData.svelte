<script>
  // IMPORTS
  import { goto } from "$app/navigation";
  import { tableStoreData } from "$lib/stores";
  import { get } from "svelte/store";
  import {parseTableColumns} from "$lib/utils.js";
  // COMPONENTS
  import Jspreadsheet from "$lib/components/Jspreadsheet.svelte";

  // PROPS
  export let data;

  // VARIABLES
  let receivedData = get(tableStoreData);
  let darkMode = false;
  $: buttonText = darkMode ? "LIGHT MODE" : "DARK MODE";

  let columns = parseTableColumns(receivedData);

  console.log(columns);

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
    <li>{i} - {column.name}</li>
  </ul>
{/each}

<!-- <Jspreadsheet {columns} {tableData} {darkMode} /> -->
<Jspreadsheet {columns} {tableData} />

<div>
  <button on:click={toggleTheme}>{buttonText}</button>
  <button on:click={goBack}>RETURN TO EDITOR</button>
</div>
