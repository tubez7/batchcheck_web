<script>
  // IMPORTS
  import jspreadsheet from "jspreadsheet-ce";
  import "jsuites/dist/jsuites.css";
  import { onMount } from "svelte";
  import "../styles/jspreadsheet.css";

  // PROPS
  export let tableData;
  export let columns;
  export let styleSettings;
  export let matchValuesData;
  export let fieldTypes;
  export let darkMode;
  export let jsonSaveData;
  export let exportData;
  export let updateCompleted;

  // VARIABLES
  let spreadsheetContainer; // BIND DIV TO VARIABLE
  let table; // table instance
  $: currentDefaultTextColour = darkMode ? "white" : "black";
  const redFill = "rgb(250, 128, 128)";
  const greenFill = "rgb(66, 237, 180)";

  function createJSONObject(clicked) {
    if (clicked) {
      const returnObject = {};
      returnObject.tableData = table.getData();
      returnObject.columns = columns;
      returnObject.styleSettings = styleSettings;
      returnObject.fieldTypes = fieldTypes;
      returnObject.matchValuesData = matchValuesData;
      jsonSaveData = returnObject;
      exportData = false;
      updateCompleted = true;
    }
  }

  function changeAndCheckValues(instance, cell, x, y, value) {
    let cellName = jspreadsheet.getColumnNameFromId([x, y]);
    if (value === matchValuesData[cellName]) {
      if (fieldTypes[x] === "Visible Data Scan") {
        styleSettings[cellName] =
          `background-color: ${greenFill}; color: ${currentDefaultTextColour};`;
      } else {
        styleSettings[cellName] =
          `background-color: ${greenFill}; color: transparent;`;
      }
    } else {
      if (fieldTypes[x] === "Visible Data Scan") {
        styleSettings[cellName] =
          `background-color: ${redFill}; color: ${currentDefaultTextColour};`;
      } else {
        styleSettings[cellName] =
          `background-color: ${redFill}; color: transparent;`;
      }
    }
    table.setStyle(styleSettings);
  }
  // const toolbar = [
  //   {
  //     type: "i",
  //     content: "undo",
  //     onclick: function () {
  //       table.undo();
  //     },
  //   },
  //   {
  //     type: "i",
  //     content: "redo",
  //     onclick: function () {
  //       table.redo();
  //     },
  //   },

  //   {
  //     type: "color",
  //     content: "format_color_text",
  //     k: "color",
  //   },
  // ];

  let options = {
    data: tableData,
    columns: columns,
    tableOverflow: true, // Enables horizontal scrolling
    //tableWidth: "100%", // Allows the table to stretch
    //autoWidth: true,
    columnResize: true,
    rowResize: true,
    allowInsertColumn: false,
    allowInsertRow: false,
    style: styleSettings,
    tableHeight: "auto",
    //toolbar: toolbar,
    onchange: changeAndCheckValues,
  };

  $: exportData, createJSONObject(exportData);

  onMount(() => {
    table = jspreadsheet(spreadsheetContainer, options);
  });
</script>

<div id="spreadsheet" bind:this={spreadsheetContainer}></div>

<style>
  #spreadsheet {
    font-size: 16px;
    margin: 0;
  }
</style>
