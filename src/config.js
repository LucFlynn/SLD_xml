// Map spreadsheet headers → XML tags (Google/Meta safe)
const headerMap = {
  "ID": "g:eventid",
  "Visible Title": "g:title",
  "Description": "g:description",
  "Date": "g:dateofshow",
  "End Date": "g:enddate",
  "Image": "g:largeimage",
  "AdGenre": "g:primarygenres",
  "Buy Button Link": "g:ticketlink",
  "Price1": "g:price",
  // Add more if they’re required
};
const requiredHeaders = ["ID", "Visible Title", "Date", "Image", "Buy Button Link"];