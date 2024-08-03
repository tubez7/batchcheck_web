<script>
  // COMPONENTS
  import FieldItemStyle from "$lib/components/FieldItemStyle.svelte";

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
  <fieldset>
    <FieldItemStyle>
      <p>Field Separator: {separator || "N/A"}</p>
      <button on:click={enterEditSeparatorMode}>Edit</button>
    </FieldItemStyle>
  </fieldset>
{/if}

{#if editSeparator}
  <fieldset>
    <FieldItemStyle>
      <label for="prefix">Field Separator: </label>
      <input bind:value={separator} type="text" id="separator" {placeholder} />
      <button on:click={handleSave} disabled={!changeMade}>SAVE</button>
      <button on:click={handleCancel}>CANCEL</button>
    </FieldItemStyle>
  </fieldset>
{/if}
