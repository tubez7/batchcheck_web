<script>
  // COMPONENTS
  import FieldItemStyle from "$lib/components/FieldItemStyle.svelte";

  // PROPS
  export let type;
  export let editMode;
</script>

<h3>Standard Fields</h3>
<FieldItemStyle>
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
    id="fieldType4"
    name="field-type"
    value="Invisible-scan"
    bind:group={type}
    disabled={editMode}
  />
  <label for="fieldType4">Scan Check</label>
  <input
    type="radio"
    id="fieldType3"
    name="field-type"
    value="Visible-scan"
    bind:group={type}
    disabled={editMode}
  />
  <label for="fieldType3">Visible Scan Check</label>
</FieldItemStyle>

<div class="header-block">
  <h3 id="header-header-block">Composite Fields</h3>
  <p class="msg">(Composite fields values are set from the Edit Field Menu)</p>
</div>

<FieldItemStyle>
  <input
    type="radio"
    id="fieldType5"
    name="field-type"
    value="Composite QR"
    bind:group={type}
    disabled={editMode}
  />
  <label for="fieldType5">Composite-Field QR</label>
  <input
    type="radio"
    id="fieldType6"
    name="field-type"
    value="Composite-scan"
    bind:group={type}
    disabled={editMode}
  />
  <label for="fieldType6">Composite-Field Scan Check</label>
</FieldItemStyle>

<style>
  .header-block {
    display: flex;
    align-items: center;
    margin-top: 1.5em;
  }

  h3 {
    margin-bottom: 0;
    margin-top: 0;
  }

  .msg {
    margin-left: 0.75em;
    margin-bottom: 0;
    margin-top: 0;
  }
</style>
