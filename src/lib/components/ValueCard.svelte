<script>
  // PROPS
  export let name;
  export let id;
  export let index;
  export let compositeField;

  console.log(compositeField, "CONSOLE LOGGING TO PREVENT ERRORS");
</script>


<div id="value-card">
  <p>{name}</p>
  <p>{id}</p>
  <p>INDEX: {index}</p>
</div>

<style>
    #value-card {
        border-style: dashed;
    }
</style>