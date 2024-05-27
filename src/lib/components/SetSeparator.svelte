<script>
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
