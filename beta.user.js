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
    css = '.modal-open .modal .dropdown-menu{z-index: 2050;}.modal-open .modal .dropdown.open{*z-index: 2050;}.modal-open .modal .popover{z-index: 2060;}.modal-open .modal .tooltip{z-index: 2080;}.modal-backdrop{position: fixed;top: 0;right: 0;bottom: 0;left: 0;z-index: 1040;background-color: #000000;}.modal-backdrop.fade{opacity: 0;}.modal-backdrop,.modal-backdrop.fade.in{opacity: 0.8;filter: alpha(opacity=80);}.modal{position: absolute;top: 50%;left: 50%;z-index: 2001;width: 560px;margin: -250px 0 0 -280px;overflow: auto;background-color: #ffffff;border: 1px solid #999;border: 1px solid rgba(0, 0, 0, 0.3);*border: 1px solid #999;-webkit-border-radius: 6px;-moz-border-radius: 6px;border-radius: 6px;-webkit-box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);-moz-box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);-webkit-background-clip: padding-box;-moz-background-clip: padding-box;background-clip: padding-box;}.modal.fade{top: -25%;-webkit-transition: opacity 0.3s linear, top 0.3s ease-out;-moz-transition: opacity 0.3s linear, top 0.3s ease-out;-o-transition: opacity 0.3s linear, top 0.3s ease-out;transition: opacity 0.3s linear, top 0.3s ease-out;}.modal.fade.in{top: 50%;}.modal-header{padding: 9px 15px;border-bottom: 1px solid #eee;}.modal-header .close{margin-top: 2px;}.modal-header h3{margin: 0;line-height: 30px;}.modal-body{max-height: 400px;padding: 15px;overflow-y: auto;}.modal-form{margin-bottom: 0;}.modal-footer{padding: 14px 15px 15px;margin-bottom: 0;text-align: right;background-color: #f5f5f5;border-top: 1px solid #ddd;-webkit-border-radius: 0 0 6px 6px;-moz-border-radius: 0 0 6px 6px;border-radius: 0 0 6px 6px;*zoom: 1;-webkit-box-shadow: inset 0 1px 0 #ffffff;-moz-box-shadow: inset 0 1px 0 #ffffff;box-shadow: inset 0 1px 0 #ffffff;}.modal-footer:before,.modal-footer:after{display: table;line-height: 0;content: "";}.modal-footer:after{clear: both;}.modal-footer .btn + .btn{margin-bottom: 0;margin-left: 5px;}.modal-footer .btn-group .btn + .btn{margin-left: -1px;}.pull-right{float: right;}.pull-left{float: left;}.hide{display: none;}.show{display: block;}.invisible{visibility: hidden;}.iris-picker .iris-strip{position: absolute !important;right: 0;}.modal-big{width: 700px;margin-left: -350px;}@media (max-width: 767px){.modal-big{width: auto;margin-left: auto;}}';
    userColorSchemeTemplate = 'body, #top-bar, #index-section, #content-section {background-color : %bg-color% !important;}body{color: %font-color% !important;}a, #top-navigation a, #sub-navigation a{color: %link-color% !important;}';
    $('body').append('<div class="modal hide fade modal-big" id="beta-modal"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button><h3>Beta++</h3></div><div class="modal-body"><h2>Renkler</h2><table class="table"><tr><td>Arkaplan</td><td>Yazılar</td><td>Bağlantılar</td></tr><tr><td><input id="eksibeta-colorpicker-bg"></td><td><input id="eksibeta-colorpicker-text"></td><td><input id="eksibeta-colorpicker-link"></td></tr></table></div></div>');


    betaApp = {
        userPrefs: {
            getBgColor: function() {
                return $.jStorage.get('eksibeta-user-bgColor', '#ccc');
            },
            getLinkColor: function() {
                return $.jStorage.get('eksibeta-user-linkColor', 'navy');
            },
            getTextColor: function() {
                return $.jStorage.get('eksibeta-user-fontColor', '#666');
            }
        },

        updatePageColor: function() {
            var style = userColorSchemeTemplate;
            style = style.replace(
                '%bg-color%',
                betaApp.userPrefs.getBgColor()
            );
            style = style.replace(
                '%link-color%',
                betaApp.userPrefs.getLinkColor()
            );
            style = style.replace(
                '%font-color%',
                betaApp.userPrefs.getTextColor()
            );

            if ($('#page-colors').length === 0) {
                $('head').append('<style id="page-colors"></style>');
            }

            $('#page-colors').text(style);
        },

        allJsLoaded: function() {
            $('head').append(
                '<style>' + css + '</style>'
            );

            $('#eksibeta-colorpicker-bg').iris({
                hide: false,
                change: function(event, ui) {
                    $.jStorage.set('eksibeta-user-bgColor', ui.color.toString());
                    betaApp.updatePageColor();
                }
            });

            $('#eksibeta-colorpicker-text').iris({
                hide: false,
                change: function(event, ui) {
                    $.jStorage.set('eksibeta-user-fontColor', ui.color.toString());
                    betaApp.updatePageColor();
                }
            });

            $('#eksibeta-colorpicker-link').iris({
                hide: false,
                change: function(event, ui) {
                    $.jStorage.set('eksibeta-user-linkColor', ui.color.toString());
                    betaApp.updatePageColor();
                }
            });

            $('body').on('show', '#beta-modal', function(e) {
                //Renkler
                $('#eksibeta-colorpicker-bg').val(betaApp.userPrefs.getBgColor()).change();
                $('#eksibeta-colorpicker-text').val(betaApp.userPrefs.getTextColor()).change();
                $('#eksibeta-colorpicker-link').val(betaApp.userPrefs.getLinkColor()).change();
            });

            $('body').on('click', '#open-beta-modal', function(e) {
                e.preventDefault();
                $modal = $('#beta-modal');
                $modal.modal('show');
                $modal.removeClass('hide');
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

            $('.topic-list, #entry-list').addClass('unstyled');

            betaApp.updatePageColor();
        }
    };
    
    $.getScript(
        "https://raw.github.com/cnkt/eksi-beta/master/ui/js/yepnope.js",
        function() {
            yepnope({
                load: [
                    '//cdnjs.cloudflare.com/ajax/libs/json2/20110223/json2.js',
                    '//ajax.googleapis.com/ajax/libs/jqueryui/1.8.23/jquery-ui.min.js',
                    'https://raw.github.com/Automattic/Iris/master/dist/iris.js',
                    'https://raw.github.com/cnkt/eksi-beta/master/ui/js/twitter-bootstrap/js/bootstrap-modal.js',
                    'https://raw.github.com/andris9/jStorage/master/jstorage.js',

                    'https://raw.github.com/Automattic/Iris/master/src/iris.min.css'
                ],
                complete: function() {
                    betaApp.allJsLoaded();
                }
            })
        }
    );
}

addJQuery(main);