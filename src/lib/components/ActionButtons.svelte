<script>
  // COMPONENTS
  import FieldsetStyle from "$lib/components/FieldsetStyle.svelte";
  import TwoButtons from "$lib/components/TwoButtons.svelte";

  // PROPS
  export let tableGeneratePopUp;
  export let disabled;
  export let editMode;
  export let formValidated;

  // FUNCTIONS
  function toggleEditMode(e) {
    e.preventDefault();
    editMode = !editMode;
  }

  function openTableNamePopUp(e) {
    e.preventDefault();
    tableGeneratePopUp = true;
  }
</script>

<FieldsetStyle --background="rgb(222, 222, 177)">
  <div class="button-block">
    <TwoButtons
      --hover1="rgb(181, 181, 78)"
      --hover2="rgb(181, 181, 78)"
      callbackFunc1={openTableNamePopUp}
      callbackFunc2={toggleEditMode}
      button1text="GENERATE TABLE"
      button2text={editMode ? "CREATE FIELDS" : "EDIT FIELDS"}
      disableButton1={!formValidated}
      disableButton2={disabled}
      type1="submit"
      type2="button"
    />
  </div>
</FieldsetStyle>

<style>
  .button-block {
    text-align: center;
  }
</style>
