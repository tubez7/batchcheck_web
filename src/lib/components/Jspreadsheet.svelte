<script>
  // IMPORTS
  import jspreadsheet from "jspreadsheet-ce";
  import "jsuites/dist/jsuites.css";
  import "../styles/jspreadsheet.css";
  //import "jspreadsheet-ce/dist/jspreadsheet.theme.css";
  import { onMount } from "svelte";

  // PROPS
  export let tableData;
  export let columns;
  export let styleSettings;
  export let matchValuesData;
  //export let darkMode;

  // VARIABLES
  let spreadsheetContainer; // BIND DIV TO VARIABLE
  let table; // table instance

  function changeAndCheckValues(instance, cell, x, y, value) {
    let cellName = jspreadsheet.getColumnNameFromId([x, y]);
    console.log("instance = ", instance); // the div element
    console.log("value to check = ", value); // value to check for scan fields
    console.log("matchValues = ", matchValuesData); // check values;
    styleSettings[cellName] = "background-color: Pink;";
    table.setStyle(styleSettings);
  }

  let options = {
    data: tableData,
    columns: columns,
    tableOverflow: true, // Enables horizontal scrolling
    //tableWidth: "100%", // Allows the table to stretch
    //autoWidth: true,
    columnResize: true,
    rowResize: true,
    // set style by passing in an object. Reactive background colours with grid references.
    style: styleSettings,
    tableHeight: "auto",
    onchange: changeAndCheckValues,
  };

  // PASS STYLE OBJECT INTO COMPONENT AS A PROP. SET FROM FUNCTION ON TableData component

  //   if (darkMode) {
  //     console.log("do something please");
  //   }

  onMount(() => {
    table = jspreadsheet(spreadsheetContainer, options);
    //console.log("table = ", table);
  });
</script>

<div id="spreadsheet" bind:this={spreadsheetContainer}></div>

<style>
  #spreadsheet {
    /* width: 100%; */
    font-size: 14px;
  }
</style>
