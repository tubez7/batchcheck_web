<script>
   // IMPORTS
   import {
    deleteArrayElement,
    lowerArrayElement,
    raiseArrayElement,
  } from "../../lib/utils";

  // PROPS
  export let name;
  export let id;
  export let index;
  export let compositeField;
  export let compositeData;

  console.log(compositeField, "CONSOLE LOGGING TO PREVENT ERRORS");

  // VARIABLES
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
  <p>FIELD-NAME: {name}</p>
  <p>FIELD-ID: {id}</p>
  <p>INDEX: {index}</p>
  <button on:click={moveValueUp} disabled={disableUp}>MOVE UP</button>
  <button on:click={moveValueDown} disabled={disableDown}>MOVE DOWN</button>
  <button on:click={deleteValue}>DELETE FIELD</button>
</div>

<style>
    #value-card {
        border-style: dashed;
    }
</style>