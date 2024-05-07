<script>
  // PROPS
  export let serialPadded;
  export let editMode;
</script>

<label for="pad">Pad serial: </label>
<input
  bind:checked={serialPadded}
  type="checkbox"
  id="pad"
  disabled={editMode}
/>
