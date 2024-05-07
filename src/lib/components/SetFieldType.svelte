<script>
  // PROPS
  export let type;
  export let editMode;
</script>

<fieldset>
  <input
    type="radio"
    id="fieldType1"
    name="field-type"
    value="Data"
    bind:group={type}
    checked
    disabled={editMode}
  />
  <label for="fieldType1">Data Field</label>
  <input
    type="radio"
    id="fieldType2"
    name="field-type"
    value="QR"
    bind:group={type}
    disabled={editMode}
  />
  <label for="fieldType2">QR Code</label>
  <input
    type="radio"
    id="fieldType3"
    name="field-type"
    value="Visible-scan"
    bind:group={type}
    disabled={editMode}
  />
  <label for="fieldType3">Visible Scan Check</label>
  <input
    type="radio"
    id="fieldType4"
    name="field-type"
    value="Invisible-scan"
    bind:group={type}
    disabled={editMode}
  />
  <label for="fieldType4">Invisible Scan Check</label>
  <p>
    Nb - Composite fields are special fields that only require a name. Their
    value is set from the Edit Field Menu
  </p>
  <input
    type="radio"
    id="fieldType5"
    name="field-type"
    value="Composite-scan"
    bind:group={type}
    disabled={editMode}
  />
  <label for="fieldType5">Composite-Field Scan Check</label>
  <input
    type="radio"
    id="fieldType6"
    name="field-type"
    value="Composite QR"
    bind:group={type}
    disabled={editMode}
  />
  <label for="fieldType6">Composite QR</label>
</fieldset>
