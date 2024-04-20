<script>
  // PROPS
  export let type;
</script>

<input
  type="radio"
  id="fieldType1"
  name="field-type"
  value="Data"
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
value="Visible-scan"
bind:group={type}
/>
<label for="fieldType3">Visible Scan Check</label>
<input
type="radio"
  id="fieldType4"
  name="field-type"
  value="Invisible-scan"
  bind:group={type}
/>
<label for="fieldType4">Invisible Scan Check</label>
<input
  type="radio"
  id="fieldType5"
  name="field-type"
  value="Composite-scan"
  bind:group={type}
  />
  <label for="fieldType5">Composite-Field Scan Check</label>
  <input
    type="radio"
    id="fieldType6"
    name="field-type"
    value="Composite QR"
    bind:group={type}
  />
  <label for="fieldType6">Composite QR</label>
  