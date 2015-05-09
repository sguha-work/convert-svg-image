var doc = document,
    INPUT = "input",
    HIDDEN = "hidden";

function init() {

    // Retrieve data from local storage
    document.getElementById("chartxml").value = localStorage.getItem("svgData");
    document.getElementById("path").value = localStorage.getItem("exportURL")
}

function loadSVG() {
    var svgStr = document.getElementById("chartxml").value,
        url = document.getElementById("path").value;
    document.getElementById("image-container").innerHTML = svgStr;
    // Store svg data and url
    localStorage.setItem("svgData", svgStr);

}

function setDefaultURL() {
    var _url = "http://export.api3.fusioncharts.com/";
    document.getElementById("path").value = _url;
    localStorage.setItem("exportURL", _url);
}

function createElement(tagName, attributes, parentElement) {
    var elem = doc.createElement(tagName),
        x;
    //apply all attribute
    for (x in attributes) {
        elem.setAttribute(x, attributes[x]);
    }
    //append in parent element
    parentElement && parentElement.appendChild && parentElement.appendChild(elem);
    return elem;
}


function exportSVG() {
    var exportTargetWindow = "_self",
        frameid, iframe,
        exportHandler = document.getElementById("path").value,
        //get the export type
        selectOption = document.getElementById("export-type"),
        selectedItem = selectOption.options[selectOption.selectedIndex];

    // create the server-side post object
    postData = {
        charttype: "custom",
        stream: document.getElementById("chartxml").value,
        stream_type: 'svg', // jshint ignore:line
        meta_bgColor: "#ffffff", // jshint ignore:line
        meta_bgAlpha: "1", // jshint ignore:line
        meta_DOMId: "newjschart", // jshint ignore:line
        meta_width: 500, // jshint ignore:line
        meta_height: 450, // jshint ignore:line
        parameters: [
            'exportfilename=' + "FusionCharts",
            'exportformat=' + selectedItem.value, // @todo
            'exportaction=' + "download",
            'exportparameters=' + ""
        ].join('|')
    };


    exportTargetWindow = frameid = 'newjschart_export_iframe';
    if (!window.exportIframe) {
        window.exportIframe = iframe = createElement('IFRAME', {
            name: frameid,
            width: '1px',
            height: '1px'
        }, doc.body);
        iframe.style.cssText = 'position:absolute;left:-10px;top:-10px;';
    }
    // We create a hidden form in the page body and
    // populate with input elements that contain the
    // required post data and then submit the form.
    form = createElement("form", {
        method: "POST",
        action: exportHandler,
        target: exportTargetWindow,
        style: 'display:none;'
    }, doc.body);

    for (item in postData) {
        createElement(INPUT, {
            type: HIDDEN,
            name: item,
            value: postData[item]
        }, form);
    }

    form.submit();
    doc.body.removeChild(form);

}