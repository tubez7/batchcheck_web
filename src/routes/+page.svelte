<script>
  import FieldsEdit from "$lib/components/FieldsEdit.svelte";
  import Form from "$lib/components/Form.svelte";

  let fields = [];
  let records = 1;
</script>

<h1>BATCH-CHECK v1.0</h1>
<Form bind:fields bind:records />
<FieldsEdit bind:fields bind:records />
