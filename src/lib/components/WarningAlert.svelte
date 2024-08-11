<script>
  // COMPONENTS
  import FieldsetStyle from "$lib/components/FieldsetStyle.svelte";

  // PROPS
  export let warningPopUpVisible;
  export let alert;
  export let userConfirmation;

  // FUNCTIONS
  function handleConfirm(e) {
    e.preventDefault();
    userConfirmation = true;
    warningPopUpVisible = false;
  }

  function handleCancel(e) {
    e.preventDefault();
    warningPopUpVisible = false;
  }
</script>

<p class="alert-text" id="sub-header">{alert}</p>

<FieldsetStyle --colour="rgb(121, 26, 26)" --background="rgb(255, 156, 156)">
  <p class="alert-text">Do you wish to proceed?</p>
  <div class="button-block">
    <button on:click={handleConfirm}>Confirm</button>
    <button on:click={handleCancel}>Cancel</button>
  </div>
</FieldsetStyle>

<style>
  .alert-text {
    margin-top: 0;
    text-align: center;
  }

  #sub-header {
    font-weight: bolder;
  }

  .button-block {
    display: flex;
    margin: auto;
    justify-content: space-evenly;
  }

  button {
    height: 3em;
    width: 7em;
    border-radius: 1em;
  }
</style>
