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

        allJsLoaded: function() {
            $('#background-chooser').iris({
                hide: false,
                change: function(event, ui) {
                    $("body").css( "color", ui.color.toString() )
                }
            });
            $('body').on('click', '#open-beta-modal', function(e) {
                e.preventDefault();
                $modal = $('#beta-modal');
                $modal.modal('show');
                console.log('burda');
            });

            $('#top-navigation > ul').prepend(
                "<li><a href='#' id='open-beta-modal'>Beta++</li>"
            );

            if ($('#topic').length > 0) {
                $('#aside').remove();
                $('#content-section').css({
                    "width": '994px'
                });
            }

            betaApp.changePageBgColor('#ccc');
        }
    };
    
    $('head').append('<style>.iris-picker .iris-strip{position:absolute}</style>');

    
    $('body').append('<div class="modal hide fade" id="beta-modal"> <div class="modal-header"> <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button> <h3>Beta++</h3> </div> <div class="modal-body"> <h2>Arkaplan Rengi</h2> <input id="background-chooser"> </div> </div> ');
    
    $.getScript(
        "https://raw.github.com/cnkt/eksi-beta/master/ui/js/yepnope.js",
        function() {
            yepnope({
                load: [
                    'https://raw.github.com/cnkt/eksi-beta/master/ui/js/twitter-bootstrap/js/bootstrap-modal.js',
                    '//ajax.googleapis.com/ajax/libs/jqueryui/1.8.23/jquery-ui.min.js',
                    'https://raw.github.com/Automattic/Iris/master/dist/iris.js',

                    'https://raw.github.com/Automattic/Iris/master/src/iris.min.css',
                    'https://raw.github.com/cnkt/eksi-beta/master/style.css'
                ],
                complete: function() {
                    betaApp.allJsLoaded();
                }
            })
        }
    );
}

addJQuery(main);