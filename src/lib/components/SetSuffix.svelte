<script>
  // COMPONENTS
  import FieldItemStyle from "$lib/components/FieldItemStyle.svelte";

  // PROPS
  export let suffix;
  export let editMode;
</script>

<FieldItemStyle>
  <label for="prefix">Suffix:</label>
  <input
    bind:value={suffix}
    type="text"
    id="suffix"
    placeholder="Enter static suffix text"
    disabled={editMode}
  />
</FieldItemStyle>
