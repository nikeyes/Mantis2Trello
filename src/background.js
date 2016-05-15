chrome.runtime.onInstalled.addListener(function() {
  // Replace all rules ...
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    // With a new rule ...
    chrome.declarativeContent.onPageChanged.addRules([
      {
        // That fires when a page's URL contains a 'mantis/view.php' ...
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { urlContains: 'mantis/view.php' },
          })
        ],
        // And shows the extension's page action.
        actions: [ new chrome.declarativeContent.ShowPageAction() ]
      }
    ]);
  });
  
  chrome.tabs.create({ 'url': 'chrome://extensions/?options=' + chrome.runtime.id });
});

function sendClickMessage() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var currentTab = tabs[0].id;
    chrome.pageAction.setIcon({path:"Mantis2TrelloLoadingIcon16.png",
											tabId:currentTab});
    chrome.tabs.sendMessage(currentTab, "");
  });
};

function onMessageCallback (request, sender, sendResponse) {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      var currentTab = tabs[0].id;
      chrome.pageAction.setIcon({path:"Mantis2TrelloIcon16.png",
                      tabId:currentTab});
      
		});
};

chrome.pageAction.onClicked.addListener(sendClickMessage);

chrome.runtime.onMessage.addListener(onMessageCallback);