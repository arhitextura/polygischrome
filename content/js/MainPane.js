// chrome.runtime.sendMessage({ message: "hello" }, function (res) {
//     alert(res);
// });
let CADASTER;
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

logoURL = chrome.runtime.getURL("images/Polygis_128.png");
//Logo Header
polygisDivPane.innerHTML = `
<div class = "polygis-header">
    <img src = "${logoURL}" width = "54" height="54"/>
    <div class="logo-container">
        <h1 class = "logo-text">polyGIS</h1>
        <span class = "logo-text-small">extensie chrome</span>
    </div>
</div>

`;

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
    let url = `https://geoportal.ancpi.ro/maps/rest/services/eterra3_publish/MapServer/1/query?f=json&where=INSPIRE_ID%20%3D%20%27RO.${judet_id}.${localitate_uat}.${numar_cadastral}%27&returnGeometry=true&spatialRel=esriSpatialRelIntersects&outFields=NATIONAL_CADASTRAL_REFERENCE`;
    fetch(url, options)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            dxfButton.innerText = "Descarcă DXF";
            dxfButton.classList.remove("disabled");
            dxfButton.disabled = false;
            if (data.error) {
                dxfButton.disabled = true;
                throw new Error(
                    `Eroare ${data.error.code} : ${data.error.message}`
                );
            }
            // If Cadaster was not found do nothing, send error
            if (data.features.length < 1) {
                dxfButton.disabled = true;
                throw new Error("Nu s-a gasit numarul cadastral");
            } else {
                // Request to the api to make it dxf
                CADASTER = new Cadaster(data.features[0].geometry.rings[0]);
                CADASTER.APICall_GetDXFFile(
                    judet_id,
                    localitate_uat,
                    numar_cadastral
                );
            }
        })
        .catch((err) => {
            dxfButton.innerText = err.message;
            AddLoaderToButton(dxfButton);
            setTimeout(function () {
                dxfButton.innerText = "Descarcă DXF";
                dxfButton.disabled = false;
            }, 3000);
        });
}

function ListenHiddenInputsHandleButton() {}

dxfButton.addEventListener("mouseup", (e) => {
    if (
        JUDETE_INPUT_HIDDEN.value != -1 &&
        LISTA_UAT_INPUT_HIDDEN.value != -1 &&
        NC_INPUT.value != ""
    ) {
        dxfButton.innerText = "Se încarcă...";
        dxfButton.classList.add("disabled");
        dxfButton.disabled = true;
        GetCadasralPoints(
            JUDETE_INPUT_HIDDEN.value,
            LISTA_UAT_INPUT_HIDDEN.value,
            NC_INPUT.value
        );
    } else {
        if (JUDETE_INPUT_HIDDEN.value == -1) {
            let judeteWidget = document.querySelectorAll(
                "[widgetid='judete']"
            )[0];
            let judeteArrowButton = judeteWidget.firstChild;
            judeteWidget.classList.add("error-border");
            judeteArrowButton.addEventListener("mouseup", () => {
                judeteWidget.classList.remove("error-border");
            });
        }
        if (
            LISTA_UAT_INPUT_HIDDEN.value == 0 ||
            LISTA_UAT_INPUT_HIDDEN.value == "" ||
            LISTA_UAT_INPUT_HIDDEN.value == -1
        ) {
            let uatListWidget = document.querySelectorAll(
                "[widgetid='uatList']"
            )[0];
            let uatArrowButton = uatListWidget.firstChild.firstChild;
            uatListWidget.classList.add("error-border");
            uatArrowButton.addEventListener("mouseup", () => {
                uatListWidget.classList.remove("error-border");
            });
        }
        if (NC_INPUT.value == "") {
            NC_INPUT.classList.add("error-border");
            console.log("ncinput widget: ", NC_INPUT);
            NC_INPUT.addEventListener("input", () => {
                NC_INPUT.classList.remove("error-border");
            });
        }
    }
});
