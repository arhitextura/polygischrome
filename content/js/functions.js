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

class Point2D {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    Sub(subtractor) {
        return new Point2D(this.x - subtractor.x, this.y - subtractor.y);
    }
    Div(divider) {
        return new Point2D(this.x / divider.x, this.y / divider.y);
    }
    toString() {
        return `${this.x},${this.y}`;
    }
}

class Cadaster {
    constructor(points) {
        this.points = points;
        this.points2D = this.CastToPoints2D(points);
        this.bbox = this.GetBoundingBox();
    }

    CastToPoints2D(points2DArray) {
        let _points2DArray = [...points2DArray];
        _points2DArray.forEach((p, i) => {
            _points2DArray[i] = new Point2D(p[0], p[1]);
        });
        return _points2DArray;
    }

    GetBoundingBox() {
        let maxXPoint = this.points2D[0].x;
        let maxYPoint = this.points2D[0].y;
        let minXPoint = this.points2D[0].x;
        let minYPoint = this.points2D[0].y;
        this.points2D.forEach((point) => {
            if (maxXPoint < point.x) {
                maxXPoint = point.x;
            }
            if (minXPoint > point.x) {
                minXPoint = point.x;
            }
            if (maxYPoint < point.y) {
                maxYPoint = point.y;
            }
            if (minYPoint > point.y) {
                minYPoint = point.y;
            }
        });
        return {
            minX: minXPoint,
            minY: minYPoint,
            maxX: maxXPoint,
            maxY: maxYPoint,
        };
    }

    GetCenterToBoundingBox() {
        return new Point2D(
            (this.bbox.maxX - this.bbox.minX) / 2 + this.bbox.minX,
            (this.bbox.maxY - this.bbox.minY) / 2 + this.bbox.minY
        );
    }

    GetExtendedBoundingBox(ext_x, ext_y) {
        center = this.GetCenterToBoundingBox();
        return {
            minX: center.x - ext_x / 2,
            minY: center.y - ext_y / 2,
            maxX: center.x + ext_x / 2,
            maxY: center.y + ext_y / 2,
        };
    }
    APICall_GetDXFFile(judet_id, localitate_uat, numar_cadastral) {
        const api_url = "https://api.polygis.xyz/dxf";
        let bodyData = {
            judet_id: judet_id,
            localitate_uat: localitate_uat,
            numar_cadastral: numar_cadastral,
            uuid: "ChromeExtension",
            points: this.points,
        };
        var options = {
            method: "POST",
            body: JSON.stringify(bodyData),
        };
        fetch(api_url, options)
            .then((res) => {
                console.log(res.status);
                return res.blob();
            })
            .then((dxfBlob) => {
                var objectURL = URL.createObjectURL(dxfBlob);
                const a = document.createElement("a");
                a.href = objectURL;
                a.download = `${numar_cadastral}.dxf`;
                a.click();
                console.log(a);
            });
    }
}
