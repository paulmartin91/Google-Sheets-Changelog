function onEdit(e) {
  
  //define spreadsheet
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  
  //define first sheet
  var sheet = ss.getSheets()[0];
  
  //define the sheet you are working on
  var sheetCheck = e.source.getActiveSheet();
  
  //define change log colulmn
  var changeLogColumn = 12;
  
  //define action column
  var actionLogColumn = 13;
  
  //restrict function to first sheet
  if (sheet.getName() == sheetCheck.getName()) {
  
    //gets the range of cells edited
    var initialRange = e.range;
    
    //counts the number of rows changed
    var numberOfRows = (initialRange.getLastRow() - initialRange.getRow())+1;
    
    //defines initial range on first sheet
    var rangeToChange = sheet.getRange(initialRange.getRow(), initialRange.getColumn(), numberOfRows, 1);
    
    //defines the 'Changed' column on the same row(s) as edited range
    var editedRange = sheet.getRange(initialRange.getRow(), changeLogColumn, numberOfRows, 1)
    
    //if not the 'Changed' or 'Actioned' column (or any further to the right)
    if (initialRange.getColumn() < changeLogColumn){
      
      //Sets the changed row to current date
      editedRange.setValue(new Date());
      rangeToChange.setBackground("orange");
    }
    
    //if in the changed column
    if (initialRange.getColumn() == actionLogColumn){
      
      //define selected row
      var rangeToClear = sheet.getRange(initialRange.getRow(), 1, numberOfRows, actionLogColumn)
      
      //clear highlighting for selected row
      rangeToClear.setBackground(null);
    }
  }
}
