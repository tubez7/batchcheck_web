<script>
  // COMPONENTS
  import FieldItem from "$lib/components/FieldItem.svelte";
  import SetSeparator from "$lib/components/SetSeparator.svelte";
  import ValueCard from "$lib/components/ValueCard.svelte";
  //import FieldsSort from "$lib/components/FieldsSort.svelte";
  // PROPS
  export let createComposite;
  export let compositeField;
  export let fields;
  export let index;

  // VARIABLES
  let regularFields = fields.filter(
    (field) => !field.type.includes("Composite")
  );

  let compositeData = compositeField.compositeData;
  let separator = compositeField.compositeSeparator;

  // FUNCTIONS
  function handleClick(e) {
    e.preventDefault();
    createComposite = false;
  }

  function handleSave(e) {
    e.preventDefault();
    compositeField.compositeData = compositeData;
    fields[index] = compositeField;
    createComposite = false;
    console.log("fields after saving comp...", fields);
  }
</script>

<div id="composite-field-edit">
  <h3>COMPOSITE DATA CREATOR</h3>
  <p>Field Name: {compositeField.name}</p>

  <SetSeparator bind:separator />

  <div id="left">
    <h4>CONCATENATE FIELD DATA</h4>
    <div class="box">
      {#each regularFields as regularField}
        <FieldItem bind:compositeData field={regularField} />
      {/each}
    </div>
  </div>

  <div id="right">
    <h4>COMPOSITE DATA VALUE</h4>
    <!-- <FieldsSort bind:fields={compositeData} editMode={true} /> -->
    <div class="box">
      {#each compositeData as value, i}
        <ValueCard
          {...value}
          bind:compositeField
          bind:compositeData
          index={i}
        />
      {/each}
    </div>
  </div>
  <button on:click={handleClick}>CLOSE POP UP</button>
  <button on:click={handleSave}>SAVE CHANGES</button>
</div>

<style>
  .box {
    border-style: solid;
  }
</style>
