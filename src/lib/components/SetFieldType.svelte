<script>
  // PROPS
  export let type;
</script>

<input
  type="radio"
  id="fieldType1"
  name="field-type"
  value="data"
  bind:group={type}
  checked
/>
<label for="fieldType1">Data Field</label>
<input
  type="radio"
  id="fieldType2"
  name="field-type"
  value="QR"
  bind:group={type}
/>
<label for="fieldType2">QR Code</label>
<input
  type="radio"
  id="fieldType3"
  name="field-type"
  value="visible-scan"
  bind:group={type}
/>
<label for="fieldType3">Visible Scan Check</label>
<input
  type="radio"
  id="fieldType4"
  name="field-type"
  value="invisible-scan"
  bind:group={type}
/>
<label for="fieldType4">Invisible Scan Check</label>
