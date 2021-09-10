// Initialize button with user's preferred color
let popupBody = document.querySelector(".popup-body");
let xRangeInput = document.getElementById("x-range");
let yRangeInput = document.getElementById("y-range");
let xRangeSpan = document.querySelector(".x-range");
let yRangeSpan = document.querySelector(".y-range");
let absCoordCheckBox = document.querySelector("#coordonate-absolute");
let donationElement = document.querySelector(".link-donatie");
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
    chrome.storage.sync.get(["realCoordinates"], (res) => {
        if (res.realCoordinates == undefined) {
            chrome.storage.sync.set({ realCoordinates: true });
        }
        absCoordCheckBox.checked = res.realCoordinates;
    });
};

absCoordCheckBox.addEventListener("input", (e) => {
    chrome.storage.sync.set({ realCoordinates: e.target.checked });
});

donationElement.onmouseover = () => {
    document.querySelector(".donation-heart").classList.add("beating");
};
donationElement.onmouseout = () => {
    document.querySelector(".donation-heart").classList.remove("beating");
};
