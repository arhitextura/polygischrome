chrome.runtime.sendMessage({ message: "hello" }, function (res) {
    alert(res);
});

document.body.style.backgroundColor = "orange";
let JUDETE_INPUT_HIDDEN = document.querySelectorAll("[name = 'judete']")[0];
let LISTA_UAT_INPUT_HIDDEN = document.querySelectorAll("[name = 'uatList']")[0];
let NC_INPUT = document.querySelector("#numarCadastral");

let contentPane = document.querySelector("#dijit_layout_ContentPane_0");
//Creating the main panel
let contentPaneFirstSection = contentPane.children[1];
let polygisPane = document.createElement("div");
let polygisDivPane = contentPane.insertBefore(
    polygisPane,
    contentPaneFirstSection
);
polygisDivPane.classList.add("polygis-main");

// When the ok button is clicked expand the widget
let okButton = document.querySelectorAll("[widgetid = 'ok']")[0];
if (okButton) {
    okButton.addEventListener("click", (e) => {
        polygisDivPane.classList.add("expanded");
    });
}

//DXF Button - DoDownloadDxf ...
let dxfButton = document.createElement("button");
dxfButton.classList.add("dxf_button");
dxfButton.innerText = "Descarcă DXF";
dxfButton.disabled = false;
polygisPane.appendChild(dxfButton);

function GetCadasralPoints(judet_id, localitate_uat, numar_cadastral) {
    var options = {
        host: "geoportal.ancpi.ro",
        headers: {
            Origin: "https://geoportal.ancpi.ro",
            Referer: "https://geoportal.ancpi.ro/geoportal/imobile/Harta.html",
        },
    };
    //let url = `https://geoportal.ancpi.ro/maps/rest/services/eterra3_publish/MapServer/1/query?f=json&where=INSPIRE_ID='RO.${234}.${100969}.${63435}'&returnGeometry=true&spatialRel=esriSpatialRelIntersects&outFields=NATIONAL_CADASTRAL_REFERENCE`;
    let url = `https://geoportal.ancpi.ro/maps/rest/services/eterra3_publish/MapServer/1/query?f=json&where=INSPIRE_ID%20%3D%20%27RO.${judet_id}.${localitate_uat}.${numar_cadastral}%27&returnGeometry=true&spatialRel=esriSpatialRelIntersects&outFields=NATIONAL_CADASTRAL_REFERENCE`;
    fetch(url, options)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            console.log(data);
        });
}

function ListenHiddenInputsHandleButton() {}

dxfButton.addEventListener("mouseup", (e) => {
    console.log(JUDETE_INPUT_HIDDEN.value);
    console.log(LISTA_UAT_INPUT_HIDDEN.value);
    console.log(NC_INPUT.value);
    console.log(
        "Is all Undefined?",
        JUDETE_INPUT_HIDDEN.value != -1 &&
            LISTA_UAT_INPUT_HIDDEN.value != -1 &&
            NC_INPUT.value != ""
    );
    if (
        JUDETE_INPUT_HIDDEN.value != -1 &&
        LISTA_UAT_INPUT_HIDDEN.value != -1 &&
        NC_INPUT.value != ""
    ) {
        GetCadasralPoints(
            JUDETE_INPUT_HIDDEN.value,
            LISTA_UAT_INPUT_HIDDEN.value,
            NC_INPUT.value
        );
    } else {
        console.error("Big error in request");
    }
});
