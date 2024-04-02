<script>
  // PROPS
  export let padLeading;
  export let padTrailing;
</script>

<fieldset>
  <p>
    Pad character*: {"(Will default to leading pad character of '0' if left unspecified"}
  </p>
  <label for="pad-leading">Leading pad character: </label>
  <input
    bind:value={padLeading}
    type="text"
    id="pad-leading"
    maxLength="1"
    placeholder="Enter a single pad character"
    disabled={padTrailing.length > 0}
  />
  <label for="pad-trailing">Trailing pad character: </label>
  <input
    bind:value={padTrailing}
    type="text"
    id="pad-trailing"
    maxLength="1"
    placeholder="Enter a single pad character"
    disabled={padLeading.length > 0}
  />
</fieldset>
