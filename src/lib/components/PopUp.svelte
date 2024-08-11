<script>
  // PROPS
  export let header;
  export let subHeader = "";
</script>

<div id="pop-up">
  <div id="header-block">
    <h3>{header}</h3>
    <p>{subHeader}</p>
  </div>
  <slot />
</div>

<style>
  #pop-up {
    position: var(--position, fixed);
    display: flex;
    flex-direction: column;
    border-style: solid;
    border-radius: 0.5em;
    padding: var(--pad, 1em 1.5em);
    background-color: var(--colour, lightgrey);
    top: 50%;
    left: 50%;
    min-height: var(--min-height, 25%);
    max-height: var(--max-height, 100%);
    transform: translate(-50%, -50%);
    z-index: var(--z-index, 3);
    box-sizing: border-box;
  }

  #header-block {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 0.5em;
  }

  h3 {
    margin-bottom: 0;
  }

  p {
    margin-top: 0;
    margin-bottom: 0;
  }
</style>
