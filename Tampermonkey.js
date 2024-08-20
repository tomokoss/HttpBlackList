// ==UserScript==
// @name         网站屏蔽示例
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  尝试在访问被屏蔽的网站时显示警告并关闭页面
// @author       tanz
// @match        *://*/*
// @connect     raw.githubusercontent.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 从GitHub Pages加载屏蔽列表
    const script = document.createElement('script');
    script.src = 'https://raw.githubusercontent.com/yourusername/yourrepo/master/blocklist.js';
    document.head.appendChild(script);

    // 等待脚本加载完成
    script.onload = function() {
        const blockedUrls = window.blockedUrls;
        checkAndBlockSites(blockedUrls);
    };

    // 检查并屏蔽网站
    function checkAndBlockSites(blockedUrls) {
        if (blockedUrls.includes(window.location.href)) {
            alert('访问的网站被屏蔽！');
            window.close(); // 关闭当前页面
        }
    }
})();