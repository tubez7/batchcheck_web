<div class="container">
  <slot />
</div>

<style>
  .container {
    border-style: var(--style, solid);
    border-color: var(--colour, rgb(114, 113, 113));
    border-radius: 1em;
    padding: var(--padding, 1em);
    margin-top: var(--margin-top, 0.75em);
    margin-bottom: var(--margin-bottom, 0.75em);
    background-color: var(--background, transparent);
  }
</style>
