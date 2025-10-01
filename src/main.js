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