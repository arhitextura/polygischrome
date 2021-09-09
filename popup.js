// Initialize button with user's preferred color
let popupBody = document.querySelector(".popup-body");
let xRangeInput = document.getElementById("x-range");
let yRangeInput = document.getElementById("y-range");
let xRangeSpan = document.querySelector(".x-range");
let yRangeSpan = document.querySelector(".y-range");
let absCoordCheckBox = document.querySelector("#coordonate-absolute");

xRangeInput.addEventListener("input", (e) => {
    xRangeSpan.innerText = `x: ${e.target.value}`;
    chrome.storage.sync.set({ xRange: e.target.value });
    console.log(chrome.storage.syn);
});
yRangeInput.addEventListener("input", (e) => {
    yRangeSpan.innerText = `y: ${e.target.value}`;
    chrome.storage.sync.set({ yRange: e.target.value });
});

window.onload = function () {
    chrome.storage.sync.get(["absoluteCoordinates"], (res) => {
        if (res.absoluteCoordinates == undefined) {
            chrome.storage.sync.set({ absoluteCoordinates: e.target.checked });
        }
        absCoordCheckBox.checked = res.absoluteCoordinates;
    });
};

absCoordCheckBox.addEventListener("input", (e) => {
    chrome.storage.sync.set({ absoluteCoordinates: e.target.checked });
});
