<script>
  // PROPS
  export let field;
  export let compositeData;

  // VARIABLES
  $: fieldNumber = compositeData.length + 1;

  // FUNCTIONS
  function addFieldValues(fieldValues) {
    compositeData = [...compositeData, fieldValues];
  }

  function handleClick(e) {
    e.preventDefault();
    addFieldValues({
      name: field.name,
      id: field.id,
      fieldNumber: fieldNumber,
    });
  }
</script>

<div>
  <p>Name: {field.name}</p>
  <p>ID: {field.id}</p>
  <button on:click={handleClick}>Add to Field Value</button>
</div>
