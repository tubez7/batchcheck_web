<script>
  export let suffix;
</script>

<label for="prefix">Suffix/static text: </label>
<input
  bind:value={suffix}
  type="text"
  id="suffix"
  placeholder="Enter field suffix text"
/>
