<script>
  // COMPONENTS
  import FieldItemStyle from "$lib/components/FieldItemStyle.svelte";

  // PROPS
  export let serialPadded;
  export let editMode;
</script>

<FieldItemStyle>
  <label for="pad">Pad serial:</label>
  <input
    bind:checked={serialPadded}
    type="checkbox"
    id="pad"
    disabled={editMode}
  />
</FieldItemStyle>
