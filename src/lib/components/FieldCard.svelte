<script>
  // IMPORTS
  import {
    deleteArrayElement,
    filterCompositeData,
    lowerArrayElement,
    raiseArrayElement,
  } from "../../lib/utils";
  // COMPONENTS
  import CardValues from "$lib/components/CardValues.svelte";
  import FieldsetStyle from "$lib/components/FieldsetStyle.svelte";
  import TwoButtons from "$lib/components/TwoButtons.svelte";
  import UpDownButtons from "$lib/components/UpDownButtons.svelte";

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
  $: expanded = field.expanded;
  $: editMode, (field.expanded = false);

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
</script>

<FieldsetStyle --background="rgb(194, 203, 244)" --style="dotted">
  <div class="container">
    <div class="divider">
      <CardValues
        bind:fieldsClone
        {field}
        {editMode}
        {standardField}
        {expanded}
        {index}
      />
    </div>

    {#if editMode}
      <div class="divider move-card-block">
        <UpDownButtons
          callbackFunc1={moveFieldUp}
          disableButton1={disableUp}
          callbackFunc2={moveFieldDown}
          disableButton2={disableDown}
        />
      </div>
    {/if}
  </div>

  {#if editMode}
    {#if expanded}
      <FieldsetStyle --background="rgb(166, 182, 255)">
        <div class="button-block">
          {#if !standardField}
            <button on:click={createCompositeData}>CREATE</button>
          {/if}
          <TwoButtons
            --hover2="rgb(250, 128, 128)"
            callbackFunc1={showEditPanel}
            callbackFunc2={deleteField}
            button1text="EDIT"
            button2text="DELETE"
            disableButton1={false}
            disableButton2={false}
            type1="button"
            type2="button"
          />
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

  .button-block {
    text-align: center;
  }

  button {
    cursor: pointer;
  }

  .button-block button {
    height: 3em;
    width: 10em;
    margin-left: 0.5em;
    margin-right: 0.5em;
    border-radius: 1em;
    box-shadow: 0 5px #999;
  }

  .button-block button:hover {
    background-color: rgb(207, 207, 207);
  }

  .button-block button:active {
    box-shadow: 0 2px #666;
    transform: translateY(4px);
  }
</style>
