function generateFeedFromSheet(sheet, data) {
  // If no parameters provided, fall back to active sheet (for add-on menu usage)
  if (!sheet) {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    sheet = ss.getActiveSheet();
  }
  if (!data) {
    data = sheet.getDataRange().getValues();
  }

  const headers = data[0].map(h => String(h).trim()); // normalize headers
  const rows = data.slice(1);

  // validate required headers (case-insensitive, trimmed)
  const normalizedRequired = requiredHeaders.map(h => h.toLowerCase().trim());
  const normalizedHeaders = headers.map(h => h.toLowerCase().trim());

  requiredHeaders.forEach((h, i) => {
    if (!normalizedHeaders.includes(normalizedRequired[i])) {
      throw new Error(`Missing required header: "${h}". Found headers: ${headers.join(', ')}`);
    }
  });

  let rss = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  rss += `<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">\n<channel>\n`;
  rss += `<title>Dynamic Events Feed</title>\n`;

  rows.forEach((row, ri) => {
    if (!row.join("")) return;

    rss += `  <item>\n`;
    headers.forEach((header, i) => {
      const value = row[i];
      const tag = headerMap[header];
      if (tag && value !== "" && value !== undefined) {
        let output = value;
        if (
          Object.prototype.toString.call(value) === "[object Date]" &&
          !isNaN(value.getTime())
        ) {
          output = value.toUTCString();
        }
        rss += `    <${tag}>${escapeXML(output)}</${tag}>\n`;
      }
    });
    rss += `  </item>\n`;
  });

  rss += `</channel>\n</rss>`;

  return rss;
}