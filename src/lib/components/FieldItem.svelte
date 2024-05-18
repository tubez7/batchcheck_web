<script>
  // PROPS
  export let field;
  export let compositeValues;

  // FUNCTIONS
  function addFieldValues(fieldValues) {
    compositeValues = [...compositeValues, fieldValues];
    console.log("COMP VALUES", compositeValues);
  }

  function handleClick(e) {
    e.preventDefault();
    addFieldValues({ name: field.name, id: field.id });
  }
</script>

<div>
  <p>{field.name}</p>
  <p>{field.id}</p>
  <button on:click={handleClick}>Add to Field Value</button>
</div>
