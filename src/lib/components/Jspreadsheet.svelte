<script>
  // IMPORTS
  import jspreadsheet from "jspreadsheet-ce";
  import "jspreadsheet-ce/dist/jspreadsheet.css";
  import "jsuites/dist/jsuites.css";
  //import "jspreadsheet-ce/dist/jspreadsheet.theme.css";
  import { onMount } from "svelte";

  // PROPS
  export let tableData;
  export let columns;
  //export let darkMode;

  // VARIABLES
  let spreadsheetContainer; // BIND DIV TO VARIABLE

//   if (darkMode) {
//     console.log("do something please");
//   }

  onMount(() => {
    console.log("SPREADSHEET DATA. DATA: ", tableData, " COLUMNS: ", columns);

    if (spreadsheetContainer) {
      jspreadsheet(spreadsheetContainer, {
        data: tableData,
        columns: columns,
        tableOverflow: true, // Enables horizontal scrolling
        //tableWidth: "100%", // Allows the table to stretch
        //autoWidth: true,
        columnResize: true,
        rowResize: true,
        // set style by passing in an object. Reactive background colours with grid references.
        style: {
          "A1" : "background-color: Red",
          "A2" : "background-color: Green",
        },
      });
    }
  });
</script>

<div id="spreadsheet" bind:this={spreadsheetContainer}></div>

<style>
  #spreadsheet {
    /* width: 100%; */
    font-size: 14px;
  }
</style>
