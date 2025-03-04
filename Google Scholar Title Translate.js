// ==UserScript==
// @name         Google Scholar标题翻译（有道 & Google 选择）
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  将Google Scholar搜索结果标题翻译为中文，并在英文标题上一行显示（可选择使用有道或Google翻译）
// @author       Pencilheart
// @match        https://scholar.google.com/*
// @grant        GM_xmlhttpRequest
// @grant        GM_registerMenuCommand
// @grant        GM_getValue
// @grant        GM_setValue
// @connect      dict.youdao.com
// @connect      translate.googleapis.com
// @icon         data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0Ij48cGF0aCBmaWxsPSJyZWQiIGQ9Ik0xMiAyMS4zNWwtMS40NS0xLjMyQzUuNCAxNS4zNiAyIDEyLjI4IDIgOC41IDIgNS40MiA0LjQyIDMgNy41IDNjMS43NCAwIDMuNDEuODEgNC41IDIuMDlDMTMuMDkgMy44MSAxNC43NiAzIDE2LjUgMyAxOS41OCAzIDIyIDUuNDIgMjIgOC41YzAgMy43OC0zLjQgNi44Ni04LjU1IDExLjU0TDEyIDIxLjM1eiIvPjwvc3ZnPg==
// ==/UserScript==

(function() {
    'use strict';

    let translationService = GM_getValue('translationService', 'youdao');

    GM_registerMenuCommand("使用有道翻译", () => {
        GM_setValue('translationService', 'youdao');
        location.reload();
    });

    GM_registerMenuCommand("使用Google翻译", () => {
        GM_setValue('translationService', 'google');
        location.reload();
    });

    const titleSelector = '.gs_rt';

    document.querySelectorAll(titleSelector).forEach(titleElement => {
        const titleLink = titleElement.querySelector('a');
        if (titleLink) {
            const originalTitle = titleLink.textContent;
            const titleUrl = titleLink.href;

            // **让英文标题变小**
            titleLink.style.fontSize = 'small';

            // **在新标签页打开链接**
            titleLink.setAttribute('target', '_blank');

            setTimeout(() => {
                translateText(originalTitle, GM_getValue('translationService', 'youdao'), (translatedText) => {
                    const translatedElement = document.createElement('p');
                    translatedElement.style.fontFamily = getComputedStyle(titleLink).fontFamily;
                    translatedElement.style.fontSize = 'large';
                    translatedElement.style.fontWeight = getComputedStyle(titleLink).fontWeight;
                    translatedElement.style.margin = '0';
                    translatedElement.style.lineHeight = '1.1';

                    // **创建翻译后的链接**
                    const translatedLink = document.createElement('a');
                    translatedLink.href = titleUrl;
                    translatedLink.textContent = translatedText;
                    translatedLink.style.textDecoration = 'none';

                    // **继承英文标题的颜色**
                    translatedLink.style.color = getComputedStyle(titleLink).color;

                    // **在新标签页打开翻译后的链接**
                    translatedLink.setAttribute('target', '_blank');

                    // **鼠标悬停时显示下划线**
                    translatedLink.addEventListener('mouseenter', () => {
                        translatedLink.style.textDecoration = 'underline';
                    });
                    translatedLink.addEventListener('mouseleave', () => {
                        translatedLink.style.textDecoration = 'none';
                    });

                    translatedElement.appendChild(translatedLink);
                    titleElement.insertBefore(translatedElement, titleElement.firstChild);
                });
            }, 1000);
        }
    });

    function translateText(text, service, callback) {
        if (service === 'google') {
            const apiUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=zh-CN&dt=t&q=${encodeURIComponent(text)}`;
            GM_xmlhttpRequest({
                method: 'GET',
                url: apiUrl,
                onload: function(response) {
                    try {
                        const result = JSON.parse(response.responseText);
                        const translatedText = result[0][0][0];
                        callback(translatedText);
                    } catch (e) {
                        console.error('Google 翻译失败:', e);
                        callback('翻译失败');
                    }
                },
                onerror: function() {
                    console.error('Google 翻译API请求失败');
                    callback('翻译失败');
                }
            });
        } else {
            const url = `https://dict.youdao.com/search?q=${encodeURIComponent(text)}&keyfrom=fanyi.smartResult`;
            GM_xmlhttpRequest({
                method: 'GET',
                url: url,
                onload: function(response) {
                    try {
                        const parser = new DOMParser();
                        const doc = parser.parseFromString(response.responseText, 'text/html');
                        const translationElement = doc.querySelector('#fanyiToggle > div > p:nth-child(2)');
                        const translatedText = translationElement ? translationElement.textContent.trim() : '翻译失败';
                        callback(translatedText);
                    } catch (e) {
                        console.error('有道翻译解析失败:', e);
                        callback('翻译失败');
                    }
                },
                onerror: function() {
                    console.error('有道翻译请求失败');
                    callback('翻译失败');
                }
            });
        }
    }
})();
