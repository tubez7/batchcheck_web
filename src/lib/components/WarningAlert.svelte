<script>
  export let warningPopUpVisible;
  export let alert;
  export let userConfirmation;

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

<p id="alert-text">{alert}</p>

<div class="button-block">
  <p>Do you wish to proceed?</p>
  <div class="button-group">
    <button on:click={handleConfirm}>Confirm</button>
    <button on:click={handleCancel}>Cancel</button>
  </div>
</div>

<style>
  #alert-text {
    font-weight: bolder;
    margin-top: 0;
  }

  .button-block {
    text-align: center;
    border-style: solid;
    /* border-color: rgb(160, 153, 153); */
    border-color: rgb(121, 26, 26);
    box-sizing: border-box;
    /* background-color: rgb(250, 128, 128); */
  }

  .button-group {
    display: flex;
    margin: auto;
    margin-top: 1em;
    margin-bottom: 0.75em;
    justify-content: space-evenly;
    box-sizing: border-box;
    min-width: 20em;
  }

  button {
    margin: 0.5em;
    height: 3em;
    width: 10em;
  }
</style>
