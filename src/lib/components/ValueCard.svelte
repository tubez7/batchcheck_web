<script>
  // IMPORTS
  import {
    deleteArrayElement,
    lowerArrayElement,
    raiseArrayElement,
  } from "../../lib/utils";
  // COMPONENTS
  import UpDownButtons from "$lib/components/UpDownButtons.svelte";

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
    <UpDownButtons
      --width="3em"
      --height="2em"
      --top="0.125em"
      --bottom="0.125em"
      --shadow="0 2px #999"
      --activeShadow="0 1px #666"
      --activeTransform="translateY(2px)"
      callbackFunc1={moveValueUp}
      disableButton1={disableUp}
      callbackFunc2={moveValueDown}
      disableButton2={disableDown}
    />
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

  .info-box {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 50%;
    max-height: 6.5em;
    align-items: center;
  }

  button {
    border-radius: 1em;
    min-width: 3em;
    min-height: 2em;
    max-height: 3em;
    background-color: rgb(245, 128, 128);
    font-weight: bolder;
  }
</style>
