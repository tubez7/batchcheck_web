<div class="container">
  <slot />
</div>

<style>
  .container {
    display: flex;
    margin-top: 0.5em;
    margin-bottom: 0.5em;
    align-items: center;
    justify-content: var(--justify, normal);
  }

  .container :global(> :not(:last-child)) {
    margin-right: 0.5em;
  }

  .container :global(> :last-child) {
    margin: 0;
  }
</style>
