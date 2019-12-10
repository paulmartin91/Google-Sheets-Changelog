function onEdit(e) {
  
  //define spreadsheet
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  
  //define the first sheet
  var sheetOne = ss.getSheets()[0];
  
  //define the second sheet
  var sheetTwo = ss.getSheets()[1];
  
  //define active sheet
  var sheetCheck = e.source.getActiveSheet();
  
  //define column where changes will be logged
  var activeColumn;
  if (sheetOne.getName() == sheetCheck.getName()) {activeColumn = 12}
  if (sheetTwo.getName() == sheetCheck.getName()) {activeColumn = 20}
  
    //gets the range of cells edited
    var initialRange = e.range;
    
    //counts the number of rows changed
    var numberOfRows = (initialRange.getLastRow() - initialRange.getRow())+1;
     
    //defines initial range on first sheet
    var rangeToChange = sheetCheck.getRange(initialRange.getRow(), initialRange.getColumn(), numberOfRows, 1);
    
    //define changelog column for second user
    var editedRange 
    if (initialRange.getColumn() == activeColumn+1){  
      console.log("right one")
      editedRange = sheetCheck.getRange(initialRange.getRow(), activeColumn+2, numberOfRows, 1)}
    else {
      console.log("wrong one")
      
      //define the 'Changed' column on the same row(s) as edited range
      editedRange = sheetCheck.getRange(initialRange.getRow(), activeColumn, numberOfRows, 1)
    }
    
    //if not the 'Changed' or 'Actioned' column (or any further to the right)
    if (initialRange.getColumn() < activeColumn || initialRange.getColumn() == activeColumn+1){
      
      //Sets the changed row to current date
      editedRange.setValue(new Date());
      rangeToChange.setBackground("orange");
    }
    
    //clear formatting for row changed
    if (initialRange.getColumn() == activeColumn+1){
      var rangeToClear = sheetCheck.getRange(initialRange.getRow(), 1, numberOfRows, activeColumn+1)
      rangeToClear.setBackground(null);
    }
}
