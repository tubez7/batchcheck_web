<script>
  // COMPONENTS
  import FieldItemStyle from "$lib/components/FieldItemStyle.svelte";

  // PROPS
  export let hasSerial;
  export let editMode;
</script>

<FieldItemStyle>
  <label for="has-serial">Field has Serial#:</label>
  <input
    bind:checked={hasSerial}
    type="checkbox"
    id="has-serial"
    disabled={editMode}
  />
</FieldItemStyle>
