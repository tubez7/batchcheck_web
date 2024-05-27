<script>
  // PROPS
  export let field;
  export let compositeData;

  // FUNCTIONS
  function addFieldValues(fieldValues) {
    compositeData = [...compositeData, fieldValues];
    console.log("COMP VALUES", compositeData);
  }

  function handleClick(e) {
    e.preventDefault();
    addFieldValues({ name: field.name, id: field.id });
  }
</script>

<div>
  <p>Name: {field.name}</p>
  <p>ID: {field.id}</p>
  <button on:click={handleClick}>Add to Field Value</button>
</div>
