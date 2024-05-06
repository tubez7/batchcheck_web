<script>
  import { resetArrayOrder, reverseArrayOrder } from "../../lib/utils";
  export let fields;

  function handleDelete(e) {
    // trigger warning here before executing
    e.preventDefault();
    fields = [];
  }

  function handleResetOrder(e) {
    e.preventDefault();
    fields = resetArrayOrder(fields);
  }

  function handleReverse(e) {
    e.preventDefault();
    fields = reverseArrayOrder(fields);
  }

  //let fieldsClone = [...fields]; COMPARE VALUE FOR DISABLING
</script>

<div id="container">
  {#if fields.length > 0}
    {#if fields.length > 1}
      <button on:click={handleResetOrder}>RESET ORDER</button>
      <button on:click={handleReverse}>REVERSE ORDER</button>
    {/if}
    <button on:click={handleDelete} type="reset">DELETE ALL</button>
  {/if}
</div>
