// HTML form for non-technical users
function getFormHtml(deploymentUrl) {
  var html = '<!DOCTYPE html>' +
'<html>' +
'<head>' +
'  <base target="_top">' +
'  <style>' +
'    body {' +
'      font-family: Arial, sans-serif;' +
'      max-width: 600px;' +
'      margin: 50px auto;' +
'      padding: 20px;' +
'    }' +
'    input {' +
'      width: 100%;' +
'      padding: 10px;' +
'      margin: 10px 0;' +
'      border: 1px solid #ccc;' +
'      border-radius: 4px;' +
'      box-sizing: border-box;' +
'    }' +
'    button {' +
'      background-color: #4CAF50;' +
'      color: white;' +
'      padding: 12px 20px;' +
'      border: none;' +
'      border-radius: 4px;' +
'      cursor: pointer;' +
'      width: 100%;' +
'    }' +
'    button:hover {' +
'      background-color: #45a049;' +
'    }' +
'    .code {' +
'      background: #f4f4f4;' +
'      padding: 10px;' +
'      border-radius: 4px;' +
'      margin: 10px 0;' +
'      word-break: break-all;' +
'    }' +
'  </style>' +
'</head>' +
'<body>' +
'  <h1>XML Feed Generator</h1>' +
'  <p>Paste your Google Sheet URL or ID below to generate an XML feed:</p>' +
'' +
'  <form id="feedForm">' +
'    <input' +
'      type="text"' +
'      id="sheetUrl"' +
'      placeholder="https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/edit#gid=0"' +
'      required' +
'    />' +
'    <button type="submit">Generate Feed URL</button>' +
'  </form>' +
'' +
'  <div id="result" style="display:none; margin-top: 20px;">' +
'    <h3>Your Feed URL:</h3>' +
'    <div class="code" id="feedUrl"></div>' +
'    <p><a id="feedLink" target="_blank">Open Feed in New Tab</a></p>' +
'  </div>' +
'' +
'  <script>' +
'    var DEPLOYMENT_URL = "' + deploymentUrl + '";' +
'' +
'    document.getElementById("feedForm").addEventListener("submit", function(e) {' +
'      e.preventDefault();' +
'      var input = document.getElementById("sheetUrl").value;' +
'' +
'      var sheetId = input;' +
'      var match = input.match(/\\/spreadsheets\\/d\\/([a-zA-Z0-9-_]+)/);' +
'      if (match) {' +
'        sheetId = match[1];' +
'      }' +
'' +
'      var feedUrl = DEPLOYMENT_URL + "?id=" + encodeURIComponent(sheetId);' +
'' +
'      document.getElementById("feedUrl").textContent = feedUrl;' +
'      document.getElementById("feedLink").href = feedUrl;' +
'      document.getElementById("result").style.display = "block";' +
'    });' +
'  </script>' +
'</body>' +
'</html>';

  return html;
}
