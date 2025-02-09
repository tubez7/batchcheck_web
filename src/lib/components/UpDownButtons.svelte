<script>
  export let callbackFunc1;
  export let callbackFunc2;
  export let disableButton1;
  export let disableButton2;
</script>

<button
  id="button1"
  on:click={callbackFunc1}
  type="button"
  disabled={disableButton1}>&#11014</button
>
<button
  id="button2"
  on:click={callbackFunc2}
  type="button"
  disabled={disableButton2}>&#11015</button
>

<style>
  button {
    min-width: var(--width, 5em);
    max-width: 6em;
    min-height: var(--height, 3em);
    border-radius: 1em;
    margin-top: var(--top, 0.25em);
    margin-bottom: var(--bottom, 0.25em);
    font-weight: bolder;
    cursor: pointer;
    box-shadow: var(--shadow, 0 5px #999);
  }

  #button1:hover {
    background-color: var(--hover1, rgb(207, 207, 207));
  }

  #button2:hover {
    background-color: var(--hover2, rgb(207, 207, 207));
  }

  button:active {
    box-shadow: var(--activeShadow, 0 2px #666);
    transform: var(--activeTransform, translateY(4px));
  }
</style>
