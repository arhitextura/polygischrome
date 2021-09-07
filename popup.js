// Initialize button with user's preferred color
let xRangeInput = document.getElementById("x-range");
let yRangeInput = document.getElementById("y-range");
let xRangeSpan = document.querySelector(".x-range");
let yRangeSpan = document.querySelector(".y-range");

let changeColor = document.getElementById("changeColor");

chrome.storage.sync.get("color", ({ color }) => {
    changeColor.style.backgroundColor = color;
});

// When the button is clicked, inject setPageBackgroundColor into current page
changeColor.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: setPageBackgroundColor,
    });
});

// The body of this function will be executed as a content script inside the
// current page
function setPageBackgroundColor() {
    chrome.storage.sync.get("color", ({ color }) => {
        document.body.style.backgroundColor = color;
    });
}

xRangeInput.addEventListener("input", (e) => {
    xRangeSpan.innerText = `x: ${e.target.value}`;
    chrome.storage.sync.set({ xRange: e.target.value });
    console.log(chrome.storage.syn);
});
yRangeInput.addEventListener("input", (e) => {
    yRangeSpan.innerText = `y: ${e.target.value}`;
    chrome.storage.sync.set({ yRange: e.target.value });
});
