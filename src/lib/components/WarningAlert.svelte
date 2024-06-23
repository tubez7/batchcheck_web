<script>
  export let warning;
  export let alert;
  export let userConfirmation;

  function handleConfirm(e) {
    e.preventDefault();
    userConfirmation = true;
    warning = false;
  }

  function handleCancel(e) {
    e.preventDefault();
    warning = false;
  }
</script>

<p id="alert-text">{alert}</p>

<div id="button-block">
  <p>Do you wish to proceed?</p>
  <div id="button-group">
    <button on:click={handleConfirm}>Confirm</button>
    <button on:click={handleCancel}>Cancel</button>
  </div>
</div>

<style>
  #alert-text {
    font-weight: bolder;
  }

  #button-block {
    text-align: center;
    border-style: solid;
    box-sizing: border-box;
    background-color: rgb(250, 128, 128);
  }

  #button-group {
    display: flex;
    margin: auto;
    margin-top: 1em;
    justify-content: space-evenly;
    box-sizing: border-box;
    min-width: 20em;
  }

  button {
    margin: 0.5em;
  }
</style>
