<script>
  // IMPORTS
  import { globalNumericRegex, handleKeyDown } from "$lib/utils.js";

  // PROPS
  export let padLength;
  export let validPadLength;
  export let serialPadded;
  export let serial;
  export let minimumPadLength;

  // VARIABLES
  $: minimumPadLength = serialPadded
    ? serial
      ? serial.toString().match(globalNumericRegex)?.length || 1
      : 1
    : null;
  $: validPadLength = padLength === null || padLength >= minimumPadLength;
</script>

<label for="pad-length">Pad length*: </label>
<input
  bind:value={padLength}
  on:keydown={handleKeyDown}
  type="number"
  inputmode="numeric"
  min={minimumPadLength}
  placeholder={minimumPadLength}
  id="pad-length"
/>
{#if !validPadLength}
  <p>Pad length cannot be less than the length of the starting serial number</p>
{/if}
