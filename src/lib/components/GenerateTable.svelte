<script>
  // IMPORTS
  import { goto } from "$app/navigation";
  import { dataImported, tableStoreData, totalRowsStored } from "$lib/stores";
  // COMPONENTS
  import FieldItemStyle from "$lib/components/FieldItemStyle.svelte";
  import FieldsetStyle from "$lib/components/FieldsetStyle.svelte";
  import SetTableName from "$lib/components/SetTableName.svelte";
  import TwoButtons from "$lib/components/TwoButtons.svelte";

  // PROPS
  export let tableGeneratePopUp;
  export let fields;
  export let records;

  // VARIABLES
  let tableName;
  let validName;
  let cleanedName;

  function generateTable(e) {
    e.preventDefault();
    cleanedName = encodeURIComponent(tableName);
    tableStoreData.set(fields);
    totalRowsStored.set(records);
    dataImported.set(false);
    goto(`/${cleanedName}`);
  }

  function cancelAndClose(e) {
    e.preventDefault();
    tableName = "";
    tableGeneratePopUp = false;
  }
</script>

<FieldsetStyle --colour="rgb(0, 0, 0)" --background="rgb(92, 186, 196)">
  <SetTableName bind:tableName bind:validName />
</FieldsetStyle>

<FieldItemStyle>
  <TwoButtons
    --hover1="rgb(66, 237, 180)"
    --hover2="rgb(250, 128, 128)"
    callbackFunc1={generateTable}
    callbackFunc2={cancelAndClose}
    button1text="Confirm & Generate"
    button2text="Cancel"
    disableButton1={!validName}
    disableButton2={false}
    type1="submit"
    type2="button"
  />
</FieldItemStyle>
