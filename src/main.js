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
// Usage: ?id=<sheetId> or ?id=<fullGoogleSheetsUrl>
function doGet(e) {
  try {
    const rawId = e.parameter.id;

    // No ID provided → serve HTML form
    if (!rawId) {
      return HtmlService.createHtmlOutput(getFormHtml(WEB_APP_URL))
        .setTitle("XML Feed Generator");
    }

    // Extract Sheet ID from full URL or use as-is
    const sheetId = extractSheetId(rawId);

    // Open the sheet and generate XML
    const ss = SpreadsheetApp.openById(sheetId);
    const sheet = ss.getSheets()[0]; // Get first tab dynamically
    const data = sheet.getDataRange().getValues();

    const xml = generateFeedFromSheet(sheet, data);

    return ContentService.createTextOutput(xml)
      .setMimeType(ContentService.MimeType.XML);

  } catch (error) {
    // Return user-friendly error as plain text
    return ContentService.createTextOutput(
      "Error generating feed:\n\n" + error.message +
      "\n\nPlease ensure:\n" +
      "1. The Sheet ID is correct\n" +
      "2. The sheet is shared with this script's permissions\n" +
      "3. Required headers exist (ID, Visible Title, Date, Image, Buy Button Link)"
    ).setMimeType(ContentService.MimeType.TEXT);
  }
}

// Extract Sheet ID from full Google Sheets URL or return as-is if already an ID
function extractSheetId(input) {
  if (!input) throw new Error("Sheet ID parameter is required");

  // Match: https://docs.google.com/spreadsheets/d/<ID>/edit...
  const match = input.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  return match ? match[1] : input;
}

// This function is now in form.js