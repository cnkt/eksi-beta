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
    betaApp = {
        changePageBgColor: function(color) {
            $('body, #top-bar, #index-section, #content-section').css({
                "background-color": color
            });
        },

        addCssToPage: function(url) {
            $('head').append('<link rel="stylesheet" href="' + url + '" type="text/css" />');
        }
    };

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

    betaApp.addCssToPage('https://raw.github.com/cnkt/eksi-beta/master/ui/js/iris/iris.min.css');
    betaApp.addCssToPage('https://raw.github.com/cnkt/eksi-beta/master/ui/js/twitter-bootstrap/css/bootstrap.min.css');

    $('body').on('click', '#open-beta-modal', function(e) {
        e.preventDefault();
        $modal = $('<div class="modal hide fade" id="beta-modal"> <div class="modal-header"> <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button> <h3>Beta++</h3> </div> <div class="modal-body"> <h2>Arkaplan Rengi</h2> <input id="background-chooser"> </div> </div> ');
        $modal.modal('show');
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

    betaApp.changePageBgColor('#ccc');
}

addJQuery(main);