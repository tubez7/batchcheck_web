<script>
  // IMPORTS
  import { handleKeyDown } from "$lib/utils.js";

  // COMPONENTS
  import FieldItemStyle from "$lib/components/FieldItemStyle.svelte";

  // PROPS
  export let hasSerial;
  export let serial;
  export let validSerial;
  export let editMode;

  // VARIABLES
  $: serial = hasSerial ? serial : null;
  $: validSerial = hasSerial
    ? serial === null || (serial >= 0 && Number.isInteger(serial))
    : true;
</script>

<FieldItemStyle>
  <label for="serial">Start Serial No#*:</label>
  <input
    bind:value={serial}
    on:keydown={handleKeyDown}
    type="number"
    inputmode="numeric"
    min="0"
    id="serial"
    placeholder="0"
    disabled={editMode}
  />
  <p>{"(Will default to 0 if not specified)"}</p>
</FieldItemStyle>

{#if !validSerial}
  <p class="error-msg">Serial serial by must be an integer of 0 or greater</p>
{/if}

<style>
  .error-msg {
    margin-top: 0;
    color: red;
    font-weight: bolder;
  }
</style>
