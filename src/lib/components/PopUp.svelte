<script>
  export let header = "";
</script>

<div class="pop-up">
  <h3>{header}</h3>
  <slot />
</div>

<style>
  .pop-up {
    position: var(--position, fixed);
    display: flex;
    flex-direction: column;
    border-style: solid;
    border-radius: 10px;
    padding: 1.5em;
    padding-top: 1em;
    background-color: var(--colour, lightgrey);
    top: 50%;
    left: 50%;
    min-height: var(--min-height, 25%);
    transform: translate(-50%, -50%);
    z-index: var(--z-index, 3);
    box-sizing: border-box;
  }

  /* SET DEFAULT Z-INDEX AS A VARIABLE (AS ABOVE) SO DIFFERENT VALUES CAN POTENTIALLY BE PASSED IN */

  h3 {
    margin: auto;
    margin-bottom: 10px;
  }
</style>
