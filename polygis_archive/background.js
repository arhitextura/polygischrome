//Collecting information about the current bounding box of the user trough
// request headers
chrome.webRequest.onBeforeRequest.addListener(
    function (details) {
        return { data: details.url };
    },
    {
        urls: ["<all_urls>"],
    }
);
