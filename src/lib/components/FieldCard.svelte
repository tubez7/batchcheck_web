<script>
  // IMPORTS
  import {
    deleteArrayElement,
    filterCompositeData,
    lowerArrayElement,
    raiseArrayElement,
  } from "../../lib/utils";
  // COMPONENTS
  import FieldsetStyle from "$lib/components/FieldsetStyle.svelte";

  // PROPS
  export let fieldsClone;
  export let field;
  export let index;
  export let indexToEdit;
  export let editPanelVisible;
  export let fieldToEdit;
  export let editMode;
  export let createComposite;
  export let compositeField;

  // VARIABLES
  $: standardField =
    field.type !== "Composite QR" && field.type !== "Composite Scan";
  $: disableUp = index === 0;
  $: disableDown = index === fieldsClone.length - 1;
  $: id = field.id;
  $: hasSerialString = field.hasSerial ? "Yes" : "No";
  $: hasPadString = field.serialPadded ? "Yes" : "No";
  let expanded;
  $: editMode, (expanded = false);

  // FUNCTIONS
  function showEditPanel(e) {
    e.preventDefault();
    editPanelVisible = true;
    indexToEdit = index;
    fieldToEdit = { ...field };
  }

  function createCompositeData(e) {
    e.preventDefault();
    createComposite = true;
    compositeField = { ...field };
    indexToEdit = index;
  }

  function moveFieldUp(e) {
    e.preventDefault();
    fieldsClone = raiseArrayElement(fieldsClone, index);
  }

  function moveFieldDown(e) {
    e.preventDefault();
    fieldsClone = lowerArrayElement(fieldsClone, index);
  }

  function deleteField(e) {
    e.preventDefault();
    fieldsClone = filterCompositeData(
      deleteArrayElement(fieldsClone, index),
      id
    );
  }

  function toggleExpand(e) {
    e.preventDefault();
    expanded = !expanded;
  }
</script>

<FieldsetStyle --background="rgb(194, 203, 244)" --style="dotted">
  <div class="container">
    <div class="divider">
      <ul class="card">
        <li>Field Name: {field.name}</li>
        <li>Field Category: {field.type}</li>
        {#if editMode && !expanded}
          <button class="expand-collapse-button" on:click={toggleExpand}
            >Expand...</button
          >
        {/if}
        {#if standardField}
          {#if expanded}
            <li>Has Serial: {hasSerialString}</li>
            {#if field.hasSerial}
              <li>Start Number: {field.serial}</li>
              <li>Increment Value: {field.incrementValue}</li>
              <li>Records Per Increment: {field.recordsPerIncrement}</li>
              <li>Padded: {hasPadString}</li>
              <li>Pad Length: {field.padLength}</li>
              <li>Leading Pad Character: {field.padLead}</li>
              <li>Trailing Pad Character: {field.padTrail}</li>
            {/if}
            <li>Prefix: {field.prefix}</li>
            <li>Suffix: {field.suffix}</li>
          {/if}
        {/if}
      </ul>
      {#if editMode && expanded}
        <button class="expand-collapse-button" on:click={toggleExpand}
          >Collapse...</button
        >
      {/if}
    </div>

    {#if editMode}
      <div class="divider move-card-block">
        <button on:click={moveFieldUp} disabled={disableUp}>&#11014</button>
        <button on:click={moveFieldDown} disabled={disableDown}>&#11015</button>
      </div>
    {/if}
  </div>

  {#if editMode}
    {#if expanded}
      <FieldsetStyle --background="rgb(166, 182, 255)">
        <div class="button-block">
          <button on:click={showEditPanel}>EDIT</button>
          {#if !standardField}
            <button on:click={createCompositeData}>CREATE</button>
          {/if}
          <button on:click={deleteField}>DELETE</button>
        </div>
      </FieldsetStyle>
    {/if}
  {/if}
</FieldsetStyle>

<style>
  .container {
    display: flex;
    flex-direction: row;
    min-width: 100%;
    align-items: center;
  }
  .divider {
    flex: 1;
    margin-right: 0.25em;
  }

  .move-card-block {
    display: flex;
    flex-direction: column;
    background-color: rgb(166, 182, 255);
    max-width: 6em;
    min-height: 6.5em;
    border-style: solid;
    border-color: rgb(114, 113, 113);
    border-radius: 1em;
    padding: 0.5em;
    box-sizing: border-box;
    align-items: center;
  }

  .move-card-block button {
    /* width: 100%; */
    min-width: 5em;
    max-width: 6em;
    min-height: 3em;
    border-radius: 1em;
    margin-top: 0.25em;
    margin-bottom: 0.25em;
    font-weight: bolder;
  }

  .expand-collapse-button {
    border: none;
    color: blue;
    background-color: transparent;
    text-decoration: underline;
    font-style: italic;
    font-size: 1em;
  }

  .card {
    list-style-type: circle;
  }

  .button-block {
    text-align: center;
  }

  .button-block button {
    height: 3em;
    width: 10em;
    margin-left: 0.5em;
    margin-right: 0.5em;
    border-radius: 1em;
  }
</style>
