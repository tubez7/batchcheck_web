<script>
  // IMPORTS
  import { amendFieldExpanded } from "../../lib/utils";

  // PROPS
  export let editMode;
  export let field;
  export let standardField;
  export let expanded;
  export let index;
  export let fieldsClone;

  // VARIABLES
  $: hasSerialString = field.hasSerial ? "Yes" : "No";
  $: hasPadString = field.serialPadded ? "Yes" : "No";

  // FUNCTIONS
  function toggleExpand(e) {
    e.preventDefault();
    fieldsClone = amendFieldExpanded(fieldsClone, index);
  }
</script>

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

<style>
  button {
    cursor: pointer;
    border: none;
    color: blue;
    background-color: transparent;
    text-decoration: underline;
    font-style: italic;
    font-size: 1em;
  }

  button:hover {
    font-weight: bolder;
  }

  .card {
    list-style-type: circle;
  }
</style>
