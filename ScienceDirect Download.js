// ==UserScript==
// @name         下载ScienceDirect
// @namespace    https://www.sciencedirect.com/
// @version      1.0
// @description  根据URL判断是否需要去掉参数并添加下载链接,延时自动关闭
// @author       Pencilheart
// @match        https://www.sciencedirect.com/science/article/pii/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // 创建按钮
    let button = document.createElement('button');
    button.textContent = '下载PDF';
    button.style.position = 'fixed';
    button.style.top = '200px';
    button.style.right = '10px';
    button.style.padding = '10px';
    button.style.backgroundColor = '#007BFF';
    button.style.color = 'white';
    button.style.border = 'none';
    button.style.borderRadius = '5px';
    button.style.cursor = 'pointer';
    button.style.zIndex = '1000';

    // 按钮点击事件
    button.onclick = function () {
        let currentUrl = window.location.href;

        // 获取 pi/ 后的部分并判断是否带有 ? 参数
        let piiPart = currentUrl.split('/pii/')[1];
        let newUrl = '';

        // 判断是否包含参数，如果有则去除参数并添加下载链接
        if (piiPart.includes('?')) {
            // 去掉 ? 之后的部分
            newUrl = currentUrl.split('?')[0] + '/pdfft?download=true';
        } else {
            // 如果没有 ? 参数，直接添加 /pdfft?download=true
            newUrl = currentUrl + '/pdfft?download=true';
        }

        // 在新标签页打开新的下载链接
        let newTab = window.open(newUrl, '_blank');
        if (newTab) {
            // 延迟关闭新标签页，等待下载开始
            setTimeout(() => {
                if (!newTab.closed) {
                    newTab.close();
                }
            }, 5000); // 设置适当的延迟，5秒后关闭标签页
        } else {
            console.error('无法打开新标签页。请检查浏览器的弹窗拦截设置。');
        }
    };

    // 将按钮添加到页面
    document.body.appendChild(button);
})();
