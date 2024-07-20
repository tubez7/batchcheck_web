<div class="container">
  <slot />
</div>

<style>
  .container {
    display: flex;
    align-items: center;
    margin-bottom: 0.75em;
  }

  .container :global(> :not(:last-child)) {
    margin-right: 0.75em;
  }

  .container :global(> :last-child) {
    /* margin-right: 0; */
    margin: 0;
  }
</style>
