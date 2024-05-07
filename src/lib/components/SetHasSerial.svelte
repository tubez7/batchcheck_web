<script>
  // PROPS
  export let hasSerial;
  export let editMode;
</script>

<label for="has-serial">Field has Serial#: </label>
<input
  bind:checked={hasSerial}
  type="checkbox"
  id="has-serial"
  disabled={editMode}
/>
