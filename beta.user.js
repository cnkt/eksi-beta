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
    if ($('#topic').length > 0) {
        $('#aside').remove();
        $('#content-section').css({
            "width": '100%'
        });
    }

    changePageBgColor('#ccc');

    function changePageBgColor(color)
    {
        $('body, #top-bar, #index-section, #content-section').css({
            "background-color": color
        });
    }
}

addJQuery(main);