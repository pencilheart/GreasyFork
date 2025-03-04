// ==UserScript==
// @name         回车去除
// @description  自动移除从PDF等复制的文本中包含的换行符，支持谷歌翻译，百度翻译，有道翻译，DeepL翻译，必应翻译，腾讯翻译君
// @version      3.0
// @author       Pencilheart
// @match        https://translate.google.com/*
// @match        https://translate.google.cn/*
// @match        https://fanyi.baidu.com/*
// @match        http://fanyi.youdao.com/
// @match        https://www.deepl.com/translator
// @match        https://cn.bing.com/translator/*
// @match        https://fanyi.qq.com/*
// @icon         https://translate.google.cn/favicon.ico
// @namespace https://greasyfork.org/users/703434
// ==/UserScript==

javascript: document.getElementsByTagName('textarea')[0].addEventListener('input',
    function () 
    {
        var txt = "";
        txt = document.getElementsByTagName('textarea')[0].value;
        for (var i = 0; i < txt.length; i++) 
        {
            if (txt.indexOf("\n"))
            txt = txt.replace(/(?<![\.?!;:\n])\n/g," ");
        }
        document.getElementsByTagName('textarea')[0].value = txt;
    }
);

