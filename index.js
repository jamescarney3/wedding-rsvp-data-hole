
var BASE_URL = 'https://sheets.googleapis.com/v4/spreadsheets/';
var SHEET_ID = '1-Cp9gCCSIG28EGCB1ogOIxQtFNfF960JaYtXVLGuRWk';
var API_KEY = 'AIzaSyA95TdzS4n7LHl-el_W2bznw-1pekZBqf8';

var PARTIES_RANGE = 'parties!A1:A134'


window.fetchParties = function(options = {}) {
  var url = BASE_URL + SHEET_ID + '/values/' + PARTIES_RANGE + '?key=' + API_KEY;
  var xhr = new XMLHttpRequest();

  xhr.open('GET', url, true);

  xhr.onload = function(e) {
    var partiesResp = JSON.parse(e.target.responseText);
    var parties = [];

    for (var i = 1; i < partiesResp.values.length; i++) {
      var party = partiesResp.values[i];
      parties.push({ id: i + 1, name: party[0] });
    }

    if (options.success) {
      options.success(parties);
    }
  }

  xhr.onerror = function(e) {
    console.log(e);
  }

  xhr.send(null);
}
