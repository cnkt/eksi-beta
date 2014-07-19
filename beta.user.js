// ==UserScript==
// @name Beta++
// @namespace https://github.com/cnkt/
// @description Eksi Beta Guzellestirici
// @include https://eksisozluk.com/*
// ==/UserScript==

var beta = beta || {};

beta.themeUrlTemplate = '//rawgit.com/cnkt/eksi-beta/master/ui/themes/{{theme-uid}}';
beta.themesListUrl = '//rawgit.com/cnkt/eksi-beta/master/themes.json';
beta.themeList = {"themes": []};
beta.downloadThemeList = function() {
    $.ajax({
        url: beta.themesListUrl,
        async: false,
        success: function(data) {
            beta.themeList = data;
        }
    })
};
beta.isBetaThemesPage = function() {
    var url = document.URL;

    if (url.indexOf('beta-temalari--3566713') > -1) {
        return true;
    }

    return false;
};
beta.injectTheme = function(themeUid) {
    var cacheBuster = new Date().getTime();
    $('head').append('<link rel="stylesheet" href="' + beta.themeUrlTemplate.replace('{{theme-uid}}', themeUid) + '/theme.css?' + cacheBuster + '" type="text/css" />');
}

$(function() {
    $('#top-navigation >ul').prepend('<li><a href="https://eksisozluk.com/beta-temalari--3566713" id="runBeta">Beta++</a></li>');

    if (GM_getValue('betaTheme') !== 'undefined') {
        beta.injectTheme(GM_getValue('betaTheme'));
    }

    if (beta.isBetaThemesPage()) {
        var entryDiv = $('#li30471207 .content');
        var themeListHtml = '<ul id="betaThemeList">';

        $('body').on('click', '#betaThemeList', function(e) {
            e.preventDefault();
            $element = $(e.target);
            var themeUid = $element.attr('data-theme-uid');
            beta.injectTheme(themeUid);
            GM_setValue('betaTheme', themeUid);
        });

        beta.downloadThemeList();

        $.each(beta.themeList.themes, function(index, item) {
            themeListHtml += '<li><a href="#" data-theme-uid="' + item.uid + '">' + item.title + '</a></li>';
        });

        themeListHtml += '</ul>'

        entryDiv.append(themeListHtml);
    }
});

