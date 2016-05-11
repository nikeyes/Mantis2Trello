var mantis2TrelloOptions = {
    trelloAPIKey: 'PUT_YOUR_API_KEY',
    trelloIdBoard: '5731e80d7a5d89a57fa872b1',
    trelloIdMantisList: '5731ec7a00b6ebac6963b2da',
    trelloIdInmediatoLabel: '5731e80db0dfecc6d13d9843',
    trelloIdUrgenteLabel: '5731e80db0dfecc6d13d9844',
    trelloIdAltaLabel: '5731e80db0dfecc6d13d9842'
};
// Saves options to chrome.storage
function save_options() {
  
  mantis2TrelloOptions.trelloAPIKey = document.getElementById('trelloAPIKey').value;
  mantis2TrelloOptions.trelloIdBoard = document.getElementById('trelloIdBoard').value;
  mantis2TrelloOptions.trelloIdMantisList = document.getElementById('trelloIdMantisList').value;
  mantis2TrelloOptions.trelloIdInmediatoLabel = document.getElementById('trelloIdInmediatoLabel').value;
  mantis2TrelloOptions.trelloIdUrgenteLabel = document.getElementById('trelloIdUrgenteLabel').value;
  mantis2TrelloOptions.trelloIdAltaLabel = document.getElementById('trelloIdAltaLabel').value;
  
  chrome.storage.sync.set(mantis2TrelloOptions, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 1000);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default values.
  chrome.storage.sync.get(mantis2TrelloOptions, function(items) {
    document.getElementById('trelloAPIKey').value = items.trelloAPIKey;
    document.getElementById('trelloIdBoard').value = items.trelloIdBoard;
    document.getElementById('trelloIdMantisList').value = items.trelloIdMantisList;
    document.getElementById('trelloIdInmediatoLabel').value = items.trelloIdInmediatoLabel;
    document.getElementById('trelloIdUrgenteLabel').value = items.trelloIdUrgenteLabel;
    document.getElementById('trelloIdAltaLabel').value = items.trelloIdAltaLabel;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);