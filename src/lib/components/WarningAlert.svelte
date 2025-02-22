<script>
  // COMPONENTS
  import FieldsetStyle from "$lib/components/FieldsetStyle.svelte";
  import TwoButtons from "$lib/components/TwoButtons.svelte";

  // PROPS
  export let warningPopUpVisible;
  export let alert;
  export let userConfirmation;

  // FUNCTIONS
  function handleConfirm(e) {
    e.preventDefault();
    userConfirmation = true;
    warningPopUpVisible = false;
  }

  function handleCancel(e) {
    e.preventDefault();
    warningPopUpVisible = false;
  }
</script>

<p class="alert-text" id="sub-header">{alert}</p>

<FieldsetStyle --colour="rgb(121, 26, 26)" --background="rgb(255, 156, 156)">
  <p class="alert-text">Do you wish to proceed?</p>
  <div class="button-block">
    <TwoButtons
      --hover1="rgb(66, 237, 180)"
      --hover2="rgb(250, 128, 128)"
      callbackFunc1={handleConfirm}
      callbackFunc2={handleCancel}
      button1text="Confirm"
      button2text="Cancel"
      disableButton1={false}
      disableButton2={false}
      type1="button"
      type2="button"
    />
  </div>
</FieldsetStyle>

<style>
  .alert-text {
    margin-top: 0;
    text-align: center;
  }

  #sub-header {
    font-weight: bolder;
  }

  .button-block {
    display: flex;
    margin: auto;
    justify-content: space-evenly;
  }
</style>
