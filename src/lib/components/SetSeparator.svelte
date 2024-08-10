<script>
  // COMPONENTS
  import FieldItemStyle from "$lib/components/FieldItemStyle.svelte";
  import FieldsetStyle from "$lib/components/FieldsetStyle.svelte";

  // PROPS
  export let separator;
  export let editSeparator;

  // VARIABLES
  let savedValue = separator;
  $: placeholder = separator ? separator : "Enter field separator value";
  $: changeMade = separator !== savedValue;

  // FUNCTIONS
  function handleSave(e) {
    e.preventDefault();
    savedValue = separator;
    editSeparator = false;
  }

  function handleCancel(e) {
    e.preventDefault();
    separator = savedValue;
    editSeparator = false;
  }

  function enterEditSeparatorMode(e) {
    e.preventDefault();
    editSeparator = true;
  }
</script>

{#if !editSeparator}
  <FieldsetStyle
    --colour="rgb(194, 169, 41)"
    --padding="0 0.2em 0 0.2em"
    --background="rgb(250, 227, 125)"
  >
    <FieldItemStyle>
      <p>Field Separator: {separator || "N/A"}</p>
      <button on:click={enterEditSeparatorMode}>Edit</button>
    </FieldItemStyle>
  </FieldsetStyle>
{/if}

{#if editSeparator}
  <FieldsetStyle --colour="rgb(194, 169, 41)">
    <FieldItemStyle>
      <label for="prefix">Field Separator: </label>
      <input bind:value={separator} type="text" id="separator" {placeholder} />
      <button on:click={handleSave} disabled={!changeMade}>SAVE</button>
      <button on:click={handleCancel}>CANCEL</button>
    </FieldItemStyle>
  </FieldsetStyle>
{/if}
