<script>
  // IMPORTS
  import {
    deleteArrayElement,
    lowerArrayElement,
    raiseArrayElement,
  } from "../../lib/utils";

  // PROPS
  export let name;
  export let index;
  export let compositeData;

  // VARIABLES
  let position = index + 1;
  $: disableUp = index === 0;
  $: disableDown = index === compositeData.length - 1;

  // FUNCTIONS
  function moveValueUp(e) {
    e.preventDefault();
    compositeData = raiseArrayElement(compositeData, index);
  }

  function moveValueDown(e) {
    e.preventDefault();
    compositeData = lowerArrayElement(compositeData, index);
  }

  function deleteValue(e) {
    e.preventDefault();
    compositeData = deleteArrayElement(compositeData, index);
  }
</script>

<div id="value-card">
  <div class="info-box">
    <p>Value {position}: {name}</p>
    <button on:click={deleteValue}>&#128465</button>
  </div>
  <div class="move-card-block">
    <button on:click={moveValueUp} disabled={disableUp}>&#11014</button>
    <button on:click={moveValueDown} disabled={disableDown}>&#11015</button>
  </div>
</div>

<style>
  #value-card {
    display: flex;
    border-style: dashed;
    justify-content: space-between;
    background-color: rgb(250, 227, 125);
    border-color: rgb(194, 169, 41);
    border-radius: 1em;
    margin-top: 0.25em;
    margin-bottom: 0.25em;
    padding-bottom: 0.2em;
    padding-left: 0.2em;
    align-items: center;
  }

  .move-card-block {
    display: flex;
    flex-direction: column;
    background-color: rgb(214, 193, 99);
    min-width: 2.5em;
    max-width: 6em;
    max-height: 6.5em;
    border-style: solid;
    border-color: rgb(114, 113, 113);
    border-radius: 1em;
    padding: 0.25em;
    margin-right: 0.5em;
    margin-top: 0.2em;
    margin-left: 0.2em;
    align-items: center;
  }

  .move-card-block button {
    min-width: 3em;
    min-height: 2em;
    border-radius: 1em;
    margin-top: 0.125em;
    margin-bottom: 0.125em;
    font-weight: bolder;
  }

  .info-box {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 50%;
    max-height: 6.5em;
    align-items: center;
  }

  .info-box button {
    border-radius: 1em;
    min-width: 3em;
    min-height: 2em;
    max-height: 3em;
    background-color: rgb(245, 128, 128);
    font-weight: bolder;
  }
</style>
