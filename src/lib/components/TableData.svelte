<script>
  // IMPORTS
  import { goto } from "$app/navigation";
  import { tableStoreData } from "$lib/stores";
  import { get } from "svelte/store";

  // PROPS
  export let data;

  // VARIABLES
  let receivedData = get(tableStoreData);

  // FUNCTIONS
  function goBack(e) {
    e.preventDefault();
    goto("/");
  }

  console.log("received", receivedData);
</script>

<h1>Table: {data.tableName}</h1>
{#each receivedData as column, i}
  <ul>
    <li>{i} - {column.name}</li>
  </ul>
{/each}
<button on:click={goBack}>RETURN TO EDITOR</button>
