<script>
  // IMPORTS
  import { handleKeyDown } from "$lib/components/CreateFields.svelte";

  // PROPS
  export let hasSerial;
  export let serial;
  export let validSerial;

  // VARIABLES
  $: serial = hasSerial ? 0 : null;
  $: validSerial = hasSerial
    ? serial === null || (serial >= 0 && Number.isInteger(serial))
    : true;
</script>

<label for="serial">Serial No#*: </label>
<input
  bind:value={serial}
  on:keydown={handleKeyDown}
  type="number"
  inputmode="numeric"
  min="0"
  id="serial"
  placeholder="0"
/>
{#if !validSerial}
  <p>Serial serial by must be an integer of 0 or greater</p>
{/if}
