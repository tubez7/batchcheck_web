<script>
  // PROPS
  export let padLead;
  export let padTrail;
</script>

<fieldset>
  <p>
    Pad character*: {"(Will default to leading pad character of '0' if left unspecified"}
  </p>
  <label for="pad-leading">Leading pad character: </label>
  <input
    bind:value={padLead}
    type="text"
    id="pad-lead"
    maxLength="1"
    placeholder="Enter a single pad character"
    disabled={padTrail.length > 0}
  />
  <label for="pad-trailing">Trailing pad character: </label>
  <input
    bind:value={padTrail}
    type="text"
    id="pad-trail"
    maxLength="1"
    placeholder="Enter a single pad character"
    disabled={padLead.length > 0}
  />
</fieldset>
