<script>
  // PROPS
  export let createComposite;
  export let compositeField;

  // FUNCTIONS
  function handleClick(e) {
    e.preventDefault();
    createComposite = false;
  }
</script>

<div id="composite-field-edit">
  <p>PLACEHOLDER</p>
  <p>{compositeField.name}</p>
  <button on:click={handleClick}>CLOSE POP UP</button>
</div>
