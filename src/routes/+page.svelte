<script>
  import Form from '$lib/components/Form.svelte';  
  // import FieldsEdit from '$lib/components/FieldsEdit.svelte';
  let fields;
  let records;
</script>


<h1>BATCH-CHECK v1.0</h1>
<Form bind:fields={fields} bind:records={records} />
<!-- <FieldsEdit bind:fields={fields} bind:records={records} /> -->
