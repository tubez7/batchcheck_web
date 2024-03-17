<script>
  // PROPS
  export let editPanelVisible;
  export let fields;
  export let field;
  export let index;

  console.log("field in edit panel", field);
  console.log("fields in edit panel", fields);
  console.log("index of field to edit", index);

  // FUNCTIONS
  function hideEditPanel(e) {
    e.preventDefault();
    editPanelVisible = false;
  }
</script>

<br />
<br />
<div id="field-edit-popup">
  <p>THIS IS GOING TO BE A POP-UP OVERLAY WITH A Z-INDEX</p>
  <button on:click={hideEditPanel}>CLOSE</button>
  <button>SAVE & UPDATE</button>
</div>
<br />
<br />

<style>
  #field-edit-popup {
    border-style: solid;
  }
</style>
