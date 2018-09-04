// Token for API requests
var TOKEN = "NoYouCan'tHaveMyToken"

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

// Approve a video given a changed cell.
function approveVideo(event){
      // Get the row
      var row = event.range.getRow();
      // Get the location of the session ID
      var cellValueOfSessionId = "A" + row; 
      // Build the API request
      var url = "https://jekylly.com/connect/api.cgi?token=" + TOKEN + "&cell=" + cellValueOfSessionId;
      Logger.log(url);
      try {
        var response = UrlFetchApp.fetch(url, {'muteHttpExceptions': true});
        if(response.getContentText().indexOf("Error") !== -1)
        {
          throw new Error("API has failed " + response.getContentText());
        }
        else { 
          Logger.log(response.getContentText());
        }
      }
      catch(e){
         var message = e.message+'\n in file: '+e.fileName+' on line: '+e.lineNumber;
         var sendto = 'kyle.kirkby@linaro.org';
         var subject = 'The Connect video approval script encountered an error at  '+ "approveVideo";
         var errProps = JSON.stringify(this.onError);
         message = subject+'\n'+message+'\n onError: '+errProps;
         MailApp.sendEmail(sendto, subject, message); 
         Logger.log("An Error has occured when hitting the API for approving videos. Please contact it-serve") 
      }
}
// Custom trigger function that runs when an edit is made.
function onApprovalEdit(event){
  // Check if Correct Column is being hit ( in this case column 4 is the video approval status)
  if(event.range.getColumn() == 4) {
      approveVideo(event);
  }
}
