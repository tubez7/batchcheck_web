<script>
  // IMPORTS
  import { goto } from "$app/navigation";
  import { tableStoreData } from "$lib/stores";
  // COMPONENTS
  import ConfirmValuesButtons from "$lib/components/ConfirmValuesButtons.svelte";
  import FieldItemStyle from "$lib/components/FieldItemStyle.svelte";
  import FieldsetStyle from "$lib/components/FieldsetStyle.svelte";
  import SetTableName from "$lib/components/SetTableName.svelte";

  // PROPS
  export let tableGeneratePopUp;
  export let fields;

  // VARIABLES
  let tableName;

  function generateTable(e) {
    e.preventDefault();
    tableName = encodeURIComponent(tableName);
    tableStoreData.set(fields);
    goto(`/${tableName}`);
  }

  function cancelAndClose(e) {
    e.preventDefault();
    tableName = "";
    tableGeneratePopUp = false;
  }
</script>

<FieldsetStyle>
  <SetTableName bind:tableName />
</FieldsetStyle>

<FieldItemStyle>
  <ConfirmValuesButtons
    callbackFunc1={generateTable}
    callbackFunc2={cancelAndClose}
    val1="Confirm & Generate"
    val2="Cancel"
  />
</FieldItemStyle>
