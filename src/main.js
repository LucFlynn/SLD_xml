function testFeed() {
  const ss = SpreadsheetApp.openById("YOUR_SHEET_ID"); 
  const sheet = ss.getSheetByName("Live Shows (11)"); // or whatever matches
  const data = sheet.getDataRange().getValues();

  const xml = generateFeedFromSheet(sheet, data); 
  Logger.log(xml); // in IDE: View → Logs 
  return xml; // if you want clasp run to see it
}


function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("XML Feed")
    .addItem("Generate Feed", "handleGenerateFeed")
    .addToUi();
}

function handleGenerateFeed() {
  try {
    const xml = generateFeedFromSheet();
    SpreadsheetApp.getUi().alert(
      "Feed generated!\n\nCopy this URL and use it:\n" +
        ScriptApp.getService().getUrl()
    );
    // (Optional) You could write xml to Drive or email it
  } catch (e) {
    SpreadsheetApp.getUi().alert("Error generating feed: " + e.message);
  }
}