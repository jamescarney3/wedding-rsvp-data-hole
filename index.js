
var BASE_URL = 'https://sheets.googleapis.com/v4/spreadsheets/';
var SHEET_ID = '1-Cp9gCCSIG28EGCB1ogOIxQtFNfF960JaYtXVLGuRWk';
var API_KEY = 'AIzaSyA95TdzS4n7LHl-el_W2bznw-1pekZBqf8';

var PARTIES_RANGE = 'parties!A1:A666';
var PERSONS_RANGE = 'persons!A1:D254';
var INVITES_RANGE = 'invites!A1:C432';


window.fetchParties = function(options = {}) {
  var url = BASE_URL + SHEET_ID + '/values/' + PARTIES_RANGE + '?key=' + API_KEY;
  var xhr = new XMLHttpRequest();

  xhr.open('GET', url, true);

  xhr.onload = function(e) {
    var partiesResp = JSON.parse(e.target.responseText);
    var parties = [];

    for (var i = 1; i < partiesResp.values.length; i++) {
      var partyRow = partiesResp.values[i];
      if (partyRow.length) {
        parties.push({ id: i + 1, name: partyRow[0] });
      }
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


window.fetchPersonsByParty = function(id, options = {}) {
  var url = BASE_URL + SHEET_ID + '/values/' + PERSONS_RANGE + '?key=' + API_KEY;
  var xhr = new XMLHttpRequest();

  xhr.open('GET', url, true);

  xhr.onload = function(e) {
    var personsResp = JSON.parse(e.target.responseText);
    var persons = [];

    for (var i = 1; i < personsResp.values.length; i++) {
      var personsRow = personsResp.values[i];
      if (personsRow[3] == id) {
        persons.push({ id: i + 1, name: personsRow[0], type: personsRow[1], edited_name: personsRow[2], party_id: personsRow[3] });
      }
    }

    if (options.success) {
      options.success(persons);
    }
  }

  xhr.onerror =  function(e) {
    console.log(e);
  }

  xhr.send(null);
}


window.fetchInvites = function(options = {}) {
  var url = BASE_URL + SHEET_ID + '/values/' + INVITES_RANGE + '?key=' + API_KEY;
  var xhr = new XMLHttpRequest();

  xhr.open('GET', url, true);

  xhr.onload = function(e) {
    var invitesResp = JSON.parse(e.target.responseText);
    var invites = [];

    for (var i = 1; i < invitesResp.values.length; i++) {
      var invitesRow = invitesResp.values[i];
      if (invitesRow.length) {
        invites.push({ id: i + 1, name: invitesRow[0] });
      }
    }

    if (options.success) {
      options.success(invites);
    }
  }

  xhr.onerror = function(e) {
    console.log(e);
  }

  xhr.send(null);
}
