 var _mantis2TrelloOptions = {
    trelloAPIKey: 'PUT_YOUR_API_KEY',
    trelloIdMantisList: '5731ec7a00b6ebac6963b2da',
    trelloIdInmediatoLabel: '5731e80db0dfecc6d13d9843',
    trelloIdUrgenteLabel: '5731e80db0dfecc6d13d9844',
    trelloIdAltaLabel: '5731e80db0dfecc6d13d9842'
};

 var authenticationSuccess = function() { 
    console.log('Successful authentication'); 
    console.log('Trying to create Trello Card...');
    createCard(); 
  };
  
  
var authenticationFailure = function() {
      console.log('Failed authentication'); 
      alert('I have not been able to authenticate with Trello . The card will not be created.')
    };
    
var creationSuccess = function(data) {
    console.log('Card created successfully. Data returned:' + JSON.stringify(data));
    chrome.runtime.sendMessage({});
    var mantisForm = 
    document.getElementsByName('bugnote_text')[0].value = 'Trello Url: ' + data.shortUrl;
    document.getElementsByName('bugnoteadd')[0].submit();
  };
  
  var creationFailure = function(data) {
    console.log('Error:' + JSON.stringify(data));
  };
  
var oldVersionMantisBugTracker = function () {
  return document.querySelector('.sumary') !== null;
}
  
var createCard = function() {
 
    var mantisSummary = (document.querySelectorAll('.bug-summary')[1] || document.querySelector('.sumary')).innerText;
    var mantisDescription = (document.querySelectorAll('.bug-description')[1] || document.querySelector('.description')).innerText;
    var mantisUrl = window.location.href;
    var mantisPriority = (document.querySelectorAll('.bug-priority')[1] || document.querySelectorAll(".row-2")[1].childNodes[1]).innerText;
    var mantisConstructionDate = null;
    
    /*var mantisConstructionDate = document.querySelectorAll(".row-1")[6].childNodes[1].innerText;
    var validateMantisConstructionDate = Date.parse(mantisConstructionDate);
    
    if (isNaN(validateMantisConstructionDate)) {
      mantisConstructionDate = null;
    }*/
    
    /*var nodos = document.querySelectorAll(".row-2");
    for (var i=0; i< nodos.length; i++) {
      if(nodos[i].querySelectorAll(".category")[0].innerText == 'Fecha_Construccion') {
        alert(nodos[i].childNodes[1].innerText);
        mantisConstructionDate = nodos[i].childNodes[1].innerText;
      }
    }*/
    
    var cardPriority = '';
    var cardPosition = 'bottom';
    var cardDue = '';
    
    if (oldVersionMantisBugTracker()) {
      switch (mantisPriority) {
        case "inmediata":
              cardPriority = _mantis2TrelloOptions.trelloIdInmediatoLabel;
              cardPosition = 'top';
              var cardDate = new Date();
              cardDue = cardDate.toISOString();  
              break;
        case "urgente":
              cardPriority = _mantis2TrelloOptions.trelloIdUrgenteLabel;
              cardPosition = 'top';
              var cardDate = new Date();
              cardDate.setDate(cardDate.getDate() + 1);
              cardDue = cardDate.toISOString();
              break;
        case "alta":
            cardPriority = _mantis2TrelloOptions.trelloIdAltaLabel;
            cardPosition = 'top';
            var cardDate = new Date();
            cardDate.setDate(cardDate.getDate() + 3);
            cardDue = cardDate.toISOString();
            break;
      }  
    }
    
    var newCard = {
      name: mantisSummary, 
      desc: mantisDescription, 
      idList: _mantis2TrelloOptions.trelloIdMantisList,
      pos: cardPosition,
      urlSource: mantisUrl,
      idLabels: cardPriority,
      due: mantisConstructionDate || cardDue
    };

    Trello.post('/cards/', newCard, creationSuccess, creationFailure);
  };
 
 var authorizationTrello = function(mantis2TrelloOptions) {
    _mantis2TrelloOptions = mantis2TrelloOptions;
    
    Trello.setKey(_mantis2TrelloOptions.trelloAPIKey);
    Trello.authorize({
      type: 'popup',
      name: 'Mantis2Trello',
      scope: {
        read: true,
        write: true },
      expiration: 'never',
      success: authenticationSuccess,
      error: authenticationFailure
    });
  };
 
  
var onMessageCallback = function(request, sender, sendResponse) {
  chrome.storage.sync.get(_mantis2TrelloOptions, authorizationTrello); 
};

chrome.runtime.onMessage.addListener(onMessageCallback);

