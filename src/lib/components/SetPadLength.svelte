<script>
  // IMPORTS
  import { globalNumericRegex, handleKeyDown } from "$lib/utils.js";

  // COMPONENTS
  import FieldItemStyle from "$lib/components/FieldItemStyle.svelte";

  // PROPS
  export let padLength;
  export let validPadLength;
  export let serialPadded;
  export let serial;
  export let minimumPadLength;
  export let editMode;

  // VARIABLES
  $: minimumPadLength = serialPadded
    ? serial
      ? serial.toString().match(globalNumericRegex)?.length || 1
      : 1
    : null;
  $: validPadLength = padLength === null || padLength >= minimumPadLength;
</script>

<FieldItemStyle>
  <label for="pad-length">Pad length*:</label>
  <input
    bind:value={padLength}
    on:keydown={handleKeyDown}
    type="number"
    inputmode="numeric"
    min={minimumPadLength}
    placeholder={minimumPadLength}
    id="pad-length"
    disabled={editMode}
  />
</FieldItemStyle>

{#if !validPadLength}
  <p class="error-msg">
    Pad length cannot be less than the length of the starting serial number
  </p>
{/if}

<style>
  .error-msg {
    margin-top: 0;
    color: red;
    font-weight: bolder;
  }
</style>
