function testFeed() {
  const ss = SpreadsheetApp.openById("YOUR_SHEET_ID");
  const sheet = ss.getSheetByName("Live Shows (11)"); // or whatever matches your sheet name
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
    generateFeedFromSheet(); // validate it works
    const url = ScriptApp.getService().getUrl();
    SpreadsheetApp.getUi().alert(
      "Feed generated!\n\nYour feed URL:\n" + url +
      "\n\nThis URL will always show the latest data from your active sheet."
    );
  } catch (e) {
    SpreadsheetApp.getUi().alert("Error generating feed: " + e.message);
  }
}

// Web app endpoint - serves the XML feed when accessed via URL
function doGet() {
  try {
    const xml = generateFeedFromSheet();
    return ContentService.createTextOutput(xml)
      .setMimeType(ContentService.MimeType.XML);
  } catch (error) {
    return ContentService.createTextOutput("Error: " + error.message)
      .setMimeType(ContentService.MimeType.TEXT);
  }
}