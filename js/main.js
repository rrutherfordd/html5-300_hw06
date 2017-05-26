/*global $*/

$(document).ready(function () {
  //jQuery loaded?
  'use strict';
  //alert("Assignment 6");
});


/* Helper functions */

/* http://stackoverflow.com/questions/4813219/testing-if-a-checkbox-is-checked-with-jquery */
$.fn.realVal = function () {
  'use strict';
  var $obj = $(this), val = $obj.val(), type = $obj.attr('type'), un_val = $obj.attr('data-unchecked');
  if (type && type === 'checkbox') {
    if (typeof un_val === 'undefined') {
      un_val = '';
      return $obj.prop('checked') ? val : un_val;
    }
  } else {
    return val;
  }
};
/* http://stackoverflow.com/questions/4813219/testing-if-a-checkbox-is-checked-with-jquery */

/* Variables */

var i, j,  n, trow, tbodyElement, objectList, storageObject, profileArray, lProfiles, nextId, splitString;

/* Initialize variables */
window.localStorage.clear();
storageObject = {};
nextId = 1000;

/* Main functions */


function createTableRowForPersons(storageIndex) {
  'use strict';
  var splitString, td, tr, lProfiles;
  splitString = profileArray[storageIndex].split(',');
  tr = $('<tr data-id="' + nextId + '">');
  td = $('<td>').text(splitString[0]);
  tr.append(td);
  td = $('<td>').text(splitString[1]);
  tr.append(td);
  td = "<td> <input class='editButton' type='button' value='Edit'> <input class='deleteButton' type='button' value='Delete'> </td> </tr>";
  tr.append(td);
  nextId = nextId + 1;
  return tr;
}

function indexOfEventProfile(evt) {
  'use strict';
  var btn = evt.target;
  var tr = $(btn).closest('tr');
  var id = tr.attr('data-id');
  var i, len;

  lProfiles = JSON.parse(window.localStorage.getItem('profiles'));
  profileArray = lProfiles.split(';');
  
  for (i = 0, len = profileArray.length - 1; i < len; i = i + 1) {
    splitString = profileArray[i].split(',');
    window.console.log('splitString: ', splitString[2]);
    window.console.log('id: ', id);
    if (splitString[2] === id) {
      return i;
    }
  }
  return -1;

}

function addNewItemClicked() {
  'use strict';
  //window.alert("add new Item?");
  $('#listSection').hide();
  $('#inputSection').show();
}

function submitClicked() {
  'use strict';
  var name, range, rangeValue;
  name = $('#nameInput').val();
  range = parseInt($('#rangeInput').val(), 0);
  if ((name.length > 0 && typeof name === 'string') && (!isNaN(range) && typeof range === 'number')) {
    //window.alert("submit?");
    rangeValue = name + ',' + range + ',' + nextId + ';';
    //window.alert('rangeValue: ' + rangeValue);
    lProfiles = JSON.parse(window.localStorage.getItem('profiles'));
    if (lProfiles) {
      window.localStorage.setItem('profiles', JSON.stringify(lProfiles + rangeValue));
    } else {
      window.localStorage.setItem('profiles', JSON.stringify(rangeValue));
    }
  } else {
    window.alert("Input has to be a non-empty string and a number");
  }
  
  $('#tbodyStart tr').remove();
  tbodyElement  = $('#tbodyStart');
  lProfiles = JSON.parse(window.localStorage.getItem('profiles'));
  profileArray = lProfiles.split(';');
  for (i = 0; i < profileArray.length - 1; i = i + 1) {
    trow = createTableRowForPersons(i);
    tbodyElement.append(trow);
  }
  $('#listSection').show();
  $('#inputSection').hide();
  event.preventDefault();
}

function cancelClicked() {
  'use strict';
  //window.alert("cancel?");
}

function editProfile(evt) {
  'use strict';
  window.alert('editProfile');
  window.alert('Index: ' + indexOfEventProfile(evt));
  //TODO add editProfile code
}

function deleteProfile(evt) {
  'use strict';
  window.alert('deleteProfile');
  window.alert('Index: ' + indexOfEventProfile(evt));
/* TODO add deleteProfile code
  lProfiles = JSON.parse(window.localStorage.getItem('profiles'));
  profileArray = lProfiles.split(';');
  for (i = 0; i < profileArray.length - 1; i = i + 1) {
    profileArray.splice( idx, 1 );
  }
*/
}



/* Event listeners */
$('#addNewItemButton').on('click', addNewItemClicked);

$('#submitButton').on('click', submitClicked);

$('#cancelButton').on('click', cancelClicked);

$('#tbodyStart').on('click', '.editButton', editProfile);

$('#tbodyStart').on('click', '.deleteButton', deleteProfile);

/* Actions */
