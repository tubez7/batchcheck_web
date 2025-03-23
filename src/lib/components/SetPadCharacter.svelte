<script>
  // COMPONENTS
  import FieldItemStyle from "$lib/components/FieldItemStyle.svelte";

  // PROPS
  export let padLead;
  export let padTrail;
  export let editMode;
</script>

<div>
  <p class="msg">
    {"Pad character*: (Will default to leading pad character of '0' if left unspecified)"}
  </p>

  <FieldItemStyle>
    <label for="pad-lead">Leading pad character:</label>
    <input
      bind:value={padLead}
      type="text"
      id="pad-lead"
      maxLength="1"
      placeholder="Enter a pad character"
      disabled={padTrail.length > 0 || editMode}
    />
  </FieldItemStyle>

  <FieldItemStyle>
    <label for="pad-trail">Trailing pad character:</label>
    <input
      bind:value={padTrail}
      type="text"
      id="pad-trail"
      maxLength="1"
      placeholder="Enter a pad character"
      disabled={padLead.length > 0 || editMode}
    />
  </FieldItemStyle>
</div>

<style>
  .msg {
    margin: 0;
    margin-bottom: 0.5em;
    margin-top: 0.5em;
  }
</style>
