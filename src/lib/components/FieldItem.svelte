<script>
  // COMPONENTS
  import FieldsetStyle from "$lib/components/FieldsetStyle.svelte";

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

<FieldsetStyle
  --style="solid"
  --colour="rgb(194, 169, 41)"
  --background="rgb(250, 227, 125)"
  --padding="0"
  --margin-top="0.5em"
  --margin-bottom="0.5em"
>
  <div class="container">
    <p>Field: {field.name}</p>
    <button on:click={handleClick}>&#x2794</button>
  </div>
</FieldsetStyle>

<style>
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.25em;
  }

  button {
    border-radius: 1em;
    height: 2em;
    width: 3em;
  }
</style>
