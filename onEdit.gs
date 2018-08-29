//Delete all Trigger before creating a new custom installable trigger.
var triggers = ScriptApp.getProjectTriggers();
for (var i = 0; i < triggers.length; i++) {
  ScriptApp.deleteTrigger(triggers[i]);
}

// Setup a new trigger for when an edit made to one of the sessions in spreadsheet
ScriptApp.newTrigger('onApprovalEdit')
.forSpreadsheet(SpreadsheetApp.getActive())
  .onEdit()
  .create();

// Custom trigger function that runs when an edit is made.
function onApprovalEdit(event){
  // Check if Correct Column is being hit ( in this case column 4 is the video approval status)
  if(event.range.getColumn() == 4) {
    // Check if value is "Yes"
    if(event.range.getValue() == "Yes"){
     // Get the row
      var row = event.range.getRow();
      // Craft the session Id cell location
      var cellValueOfSessionId = "A" + row; 
      // Get the value of the session ID for the row modified
      var sessionId = SpreadsheetApp.getActive().getRange(cellValueOfSessionId).getValue();
      // Log the session ID video has been changed for.
      var url = "https://jekylly.com/connect/test.cgi?token=" + TOKEN + "&session_id=" + sessionId + "&approved=" + "True";
      Logger.log("Logging: %s - %s - %s",sessionId, "True", url);
      var response = UrlFetchApp.fetch(url, {'muteHttpExceptions': true});
      Logger.log("Log");
      Logger.log(response.getContentText());
    }
    // Check if value is "No"
    else if (event.range.getValue() == "No"){
      // Get the row
      var row = event.range.getRow();
      // Craft the session Id cell location
      var cellValueOfSessionId = "A" + row; 
      // Get the value of the session ID for the row modified
      var sessionId = SpreadsheetApp.getActive().getRange(cellValueOfSessionId).getValue();
      // Log the session ID video has been changed for.
      var url = "https://jekylly.com/connect/test.cgi?token=" + TOKEN + "&session_id=" + sessionId + "&approved=" + "False";
      Logger.log("Logging: %s - %s - %s",sessionId, "False", url);
      var response = UrlFetchApp.fetch(url, {'muteHttpExceptions': true});
      Logger.log("Log");
      Logger.log(response.getContentText());
    }
  }
}

