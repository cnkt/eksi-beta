// ==UserScript==
// @name Beta++
// @namespace https://github.com/cnkt/
// @description Eksi Beta Guzellestirici
// @include http://beta.eksisozluk.com/*
// ==/UserScript==
function addJQuery(callback) {
    var script = document.createElement("script");
    script.setAttribute("src", "//code.jquery.com/jquery-latest.min.js");
    script.addEventListener('load', function () {
        var script = document.createElement("script");
        script.textContent = "(" + callback.toString() + ")();";
        document.body.appendChild(script);
    }, false);
    document.body.appendChild(script);
}

function main() {
    $('#aside').remove();
    $('body, #top-bar, #index-section, #content-section').css({
        "background-color": '#ccc'
    });
    $('#content-section').css({
        "width": '100%'
    });
}

addJQuery(main);