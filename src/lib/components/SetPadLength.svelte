<script>
     // IMPORTS
  import { handleKeyDown } from "$lib/components/CreateFields.svelte";

  export let padLength;
  export let validPadLength;
  export let minimumPadLength;
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
