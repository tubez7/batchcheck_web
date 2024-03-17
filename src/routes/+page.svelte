<script>
  // COMPONENTS
  import FieldsEdit from "$lib/components/FieldsEdit.svelte";
  import Form from "$lib/components/Form.svelte";

  // VARIABLES
  let fields = [];
  let records = 1;
  $: fieldNumber = fields.length + 1;
</script>

<h1>BATCH-CHECK v1.0</h1>
<Form bind:fields bind:records bind:fieldNumber />
<FieldsEdit bind:fields bind:records />
