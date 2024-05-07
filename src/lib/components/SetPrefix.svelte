<script>
  // PROPS
  export let prefix;
  export let editMode;
</script>

<label for="prefix">Prefix/static text: </label>
<input
  bind:value={prefix}
  type="text"
  id="prefix"
  placeholder="Enter field prefix text"
  disabled={editMode}
/>
