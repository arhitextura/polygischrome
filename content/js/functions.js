function AddLoaderToButton(element) {
    console.log(`Added span to ${element.innerText}`);
    let loaderElement = document.createElement("span");
    loaderElement.classList.add("timed-loader");
    let dimensions = element.getBoundingClientRect();
    loaderElement.style.width = dimensions.width + "px";
    loaderElement.style.height = dimensions.height + "px";
    loaderElement.style.left = "0px";
    loaderElement.style.top = "0px";
    element.appendChild(loaderElement);
    //loaderElement.classList.add("retracted");
}
