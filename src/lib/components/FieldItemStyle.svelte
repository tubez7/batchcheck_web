<div class="container">
  <slot />
</div>

<style>
  .container {
    display: flex;
    margin-top: 0.75em;
    margin-bottom: 0.75em;
    border-style: solid;
    border-color: red;
  }

  .container :global(> :not(:last-child)) {
    margin-right: 0.75em;
  }

  .container :global(> :last-child) {
    /* margin-right: 0; */
    margin: 0;
  }
</style>
