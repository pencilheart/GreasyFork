// ==UserScript==
// @name         使用新标签打开（油猴列表页、谷歌学术）
// @version      1.0
// @description  油猴列表页、谷歌学术使用新标签打开
// @author       pencileheart
// @include      *://greasyfork.org/*
// @include      *://scholar.google.com/scholar?*
// @exclude      *://greasyfork.org/*/scripts/*
// @icon         data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0Ij48cGF0aCBmaWxsPSJyZWQiIGQ9Ik0xMiAyMS4zNWwtMS40NS0xLjMyQzUuNCAxNS4zNiAyIDEyLjI4IDIgOC41IDIgNS40MiA0LjQyIDMgNy41IDNjMS43NCAwIDMuNDEuODEgNC41IDIuMDlDMTMuMDkgMy44MSAxNC43NiAzIDE2LjUgMyAxOS41OCAzIDIyIDUuNDIgMjIgOC41YzAgMy43OC0zLjQgNi44Ni04LjU1IDExLjU0TDEyIDIxLjM1eiIvPjwvc3ZnPg==
// @grant        none
// @license MIT
// ==/UserScript==

(function() {
    'use strict';
    var alists = document.getElementsByTagName("a");
    for (let i = 0; i < alists.length; i++) {
        if (!alists[i].href.includes("q=")) {
            alists[i].setAttribute('target', '_blank');
        }
    }
})();
