<script>
  // COMPONENTS
  import FieldItemStyle from "$lib/components/FieldItemStyle.svelte";

  // PROPS
  export let type;
  export let editMode;
</script>

<fieldset>
  <h3 class="header">Standard Fields</h3>
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
  </FieldItemStyle>

  <div class="header-block">
    <h3>Composite Fields</h3>
    <p class="msg">
      (Composite fields values are set from the Edit Field Menu)
    </p>
  </div>

  <FieldItemStyle>
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
    <label for="fieldType6">Composite-Field QR</label>
  </FieldItemStyle>
</fieldset>

<style>
  .header-block {
    display: flex;
    align-items: center;
    margin: 0;
  }

  .msg {
    margin-left: 0.75em;
  }
</style>
