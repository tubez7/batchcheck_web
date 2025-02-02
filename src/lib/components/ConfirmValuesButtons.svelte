<script>
  export let callbackFunc1;
  export let callbackFunc2;
  export let val1;
  export let val2;
</script>

<button on:click={callbackFunc1}>{val1}</button>
<button on:click={callbackFunc2}>{val2}</button>

<style>
  button {
    height: 3em;
    width: 10em;
    margin-left: 0.5em;
    margin-right: 0.5em;
    border-radius: 1em;
  }
</style>
