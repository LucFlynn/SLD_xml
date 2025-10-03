// IMPORTANT: Update this with your actual Web App deployment URL
const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbzCtzWpK0VrvEtovZNO6zCFmSX6ohuWI3FVTF4iKYGrWHBDs-ISyJHT2i96PPJum6C4/exec";

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
  // Add more if they're required
};
const requiredHeaders = ["ID", "Visible Title", "Date", "Image", "Buy Button Link"];