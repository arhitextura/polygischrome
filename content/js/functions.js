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

class Point2D{
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    Sub(substractor){
        return new Point2D(this.x - substractor.x, this.y - substractor.y);
    }
    
}

class Cadaster{
    constructor(points = 0) {
        this.points = points;
        console.log(this.points);
    }
    GetBoundingBox(){
        return 0;
    }
    GetMaxPointX(){
        return 0;
    }
    GetMaxPointY(){
        return 0;
    }
    
    GetCenterToBoundingBox(){
        return 0;
    }

}