function onEdit(e){
  // Check if Correct Column is being hit ( in this case column 4 is the video approval status)
  if(e.range.getColumn() == 4) {
    // Check if value is "Yes"
    if(e.range.getValue() == "Yes"){
     approveVideo(e, true);
    }
    // Check if value is "No"
    else if (e.range.getValue() == "No"){
      approveVideo(e, false);
    }
  }
}

function approveVideo(e, approved){
  // Get the row
  var row = e.range.getRow();
  // Craft the session Id cell location
  var cellValueOfSessionId = "A" + row; 
  // Get the value of the session ID for the row modified
  var sessionId = SpreadsheetApp.getActive().getRange(cellValueOfSessionId).getValue();
  // Log the session ID video has been changed for.
  Logger.log("Session ID: %s Approved: %s ", sessionId, approved);
}


