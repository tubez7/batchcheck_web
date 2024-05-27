<script>
  // PROPS
  export let separator;

  // VARIABLES
  let editSeparator = false;
  let placeholder = separator ? separator : "Enter field separator value";
  let savedValue = separator;
  $: changeMade = separator !== savedValue;

  // FUNCTIONS
  function handleSave(e) {
    e.preventDefault();
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
  <button on:click={enterEditSeparatorMode}
    >Field Separator: {separator || "N/A"}</button
  >
{/if}

{#if editSeparator}
  <label for="prefix">Field Separator: </label>
  <input bind:value={separator} type="text" id="separator" {placeholder} />
  <button on:click={handleSave} disabled={!changeMade}>SAVE</button>
  <button on:click={handleCancel}>CANCEL</button>
{/if}
