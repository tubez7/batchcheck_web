<script>
  // COMPONENTS
  import FieldItemStyle from "$lib/components/FieldItemStyle.svelte";

  // PROPS
  export let prefix;
  export let editMode;
</script>

<FieldItemStyle>
  <label for="prefix">Prefix/static text:</label>
  <input
    bind:value={prefix}
    type="text"
    id="prefix"
    placeholder="Enter field prefix text"
    disabled={editMode}
  />
</FieldItemStyle>
