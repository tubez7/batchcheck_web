<script>
  // COMPONENTS
  import FieldItem from "$lib/components/FieldItem.svelte";
  import ValueCard from "$lib/components/ValueCard.svelte";
  // PROPS
  export let createComposite;
  export let compositeField;
  export let fields;
  export let index;

  // VARIABLES
  let regularFields = fields.filter(
    (field) => !field.type.includes("Composite")
  );

  let compositeValues = compositeField.compositeData;
  let separator = compositeField.compositeSeparator ? `"${compositeField.compositeSeparator}"` : "N/A";

  // FUNCTIONS
  function handleClick(e) {
    e.preventDefault();
    createComposite = false;
  }

  console.log("PLACEHOLDER FOR COMP DATA CODE", fields, index);
</script>

<div id="composite-field-edit">
  <h3>COMPOSITE DATA CREATOR</h3>
  <p>Field Name: {compositeField.name}</p>
  <p>Field Separator: {separator}</p>
  <div id="left">
    <h4>CONCATENATE FIELD DATA</h4>
    <div class="box">
      {#each regularFields as regularField}
        <FieldItem bind:compositeValues field={regularField} />
      {/each}
    </div>
  </div>

  <div id="right">
    <h4>COMPOSITE DATA VALUE</h4>
    <div class="box">
      {#each compositeValues as value, i}
        <ValueCard {...value} bind:compositeField index={i} />
      {/each}
    </div>
  </div>
  <button on:click={handleClick}>CLOSE POP UP</button>
  <button>SAVE CHANGES</button>
</div>

<style>
  .box {
    border-style: solid;
  }
</style>
