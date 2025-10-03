function debugSheetHeaders() {
  const ss = SpreadsheetApp.openById("1VyhhApSeNTb0_8zicEM-CLMabuQdNnLvjlAUQGUW6Tg");
  const sheet = ss.getSheets()[0];
  const data = sheet.getDataRange().getValues();

  Logger.log("Sheet name: " + sheet.getName());
  Logger.log("First row (headers): " + JSON.stringify(data[0]));
  Logger.log("Headers after trim: " + JSON.stringify(data[0].map(h => String(h).trim())));

  return {
    sheetName: sheet.getName(),
    headers: data[0],
    trimmedHeaders: data[0].map(h => String(h).trim())
  };
}
