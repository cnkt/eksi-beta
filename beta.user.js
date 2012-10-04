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
    $.getScript(
        "https://raw.github.com/cnkt/eksi-beta/master/ui/js/yepnope.js",
        function() {
            yepnope({
                load: [
                    'https://raw.github.com/cnkt/eksi-beta/master/ui/js/twitter-bootstrap/js/bootstrap-modal.js',
                    '//ajax.googleapis.com/ajax/libs/jqueryui/1.8.23/jquery-ui.min.js',
                    'https://raw.github.com/cnkt/eksi-beta/master/ui/js/iris/iris.js'

                ]
            })
        }
    );

    addCssToPage('https://raw.github.com/cnkt/eksi-beta/master/ui/js/iris/iris.min.css');

    $('body').on('click', '#open-beta-modal', function(e) {
        e.preventDefault();
    });

    $('#top-navigation > ul').prepend(
        "<li><a href='#' id='open-beta-modal'>Beta++</li>"
    );

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

    function addCssToPage(url)
    {
        $('head').append('<link rel="stylesheet" href="' + url + '" type="text/css" />');
    }
}

addJQuery(main);