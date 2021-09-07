function injectedFunction() {
    document.body.style.backgroundColor = "orange";
}
chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: injectedFunction,
    });
});

console.log("Background started!");

chrome.runtime.onMessage.addListener(function (res, sender, sendResponse) {
    sendResponse({ response: document });
});
