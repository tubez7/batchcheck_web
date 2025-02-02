<script>
  export let callbackFunc1;
  export let callbackFunc2;
  export let button1text;
  export let button2text;
  export let disableButton1;
  export let disableButton2;
  export let type1;
  export let type2;
</script>

<button
  id="button1"
  on:click={callbackFunc1}
  type={type1}
  disabled={disableButton1}>{button1text}</button
>
<button
  id="button2"
  on:click={callbackFunc2}
  type={type2}
  disabled={disableButton2}>{button2text}</button
>

<style>
  button {
    height: 3em;
    width: 10em;
    margin-left: 0.5em;
    margin-right: 0.5em;
    border-radius: 1em;
    cursor: pointer;
    box-shadow: 0 5px #999;
  }

  #button1:hover {
    background-color: var(--hover1, rgb(207, 207, 207));
  }

  #button2:hover {
    background-color: var(--hover2, rgb(207, 207, 207));
  }

  button:active {
    box-shadow: 0 2px #666;
    transform: translateY(4px);
  }
</style>
