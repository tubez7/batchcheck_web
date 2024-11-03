<script>
  import { goto } from "$app/navigation";
  import { tableStoreData } from "$lib/stores";
  import { onDestroy } from "svelte";
  import { get } from "svelte/store";

  /** @type {import('./$types').PageData} */
  export let data;

  //let receivedData = localStorage.getItem("tableData");
  let receivedData = get(tableStoreData);

  function goBack(e) {
    e.preventDefault();
    goto("/");
  }

  //   onMount(() => {
  //     const tableData = localStorage.getItem("tableData");
  //     if (tableData) {
  //       receivedData = JSON.parse(tableData); // Parse the data back into an array
  //     }
  //   });

  onDestroy(() => {
    //localStorage.removeItem("tableData");
    console.log("destroyed");
  });

  console.log("received", receivedData);
</script>

<h1>Table: {data.tableName}</h1>
<button on:click={goBack}>RETURN TO EDITOR</button>
