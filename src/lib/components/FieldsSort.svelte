<script>
  export let fields;

  function resetData(e) {
    // trigger warning here before executing
    e.preventDefault();
    fields = [];
  }

  //let fieldsClone = [...fields];
</script>

<div id="container">
  {#if fields.length > 0}
    {#if fields.length > 1}
      <button>RESET ORDER</button>
      <button>REVERSE ORDER</button>
    {/if}
    <button on:click={resetData} type="reset">DELETE ALL</button>
  {/if}
</div>
