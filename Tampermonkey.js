// ==UserScript==
// @name         网站屏蔽示例
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  访问被屏蔽的网站时显示警告并重定向
// @author       tanz
// @match        *://*/*
// @connect      *
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 动态加载远程JavaScript文件
    function loadScript(url, callback) {
        var script = document.createElement('script');
        script.src = url;
        script.onload = function() {
            if (window.blockedUrls && Array.isArray(window.blockedUrls)) {
                callback(window.blockedUrls);
            } else {
                console.error('blockedUrls not defined in the loaded script.');
            }
        };
        script.onerror = function() {
            console.error('Error loading the script:', url);
        };
        document.head.appendChild(script);
    }

    // 远程屏蔽列表URL
    var remoteListUrl = 'https://qipantanyi.github.io/HttpBlackList/blocklist.js';
    loadScript(remoteListUrl, function(blockedUrls) {
        // 使用获取到的blockedUrls进行检查
        checkAndBlockSites(blockedUrls);
    });

    // 检查并屏蔽网站
    function checkAndBlockSites(blockedUrls) {
        for (var i = 0; i < blockedUrls.length; i++) {
            var blockedUrl = new URL(blockedUrls[i]);
            if (location.host === blockedUrl.host && location.pathname.startsWith(blockedUrl.pathname)) {
                alert('访问的网站被屏蔽！');
                redirectToBlockedPage(); // 重定向到被屏蔽的页面
                return;
            }
        }
    }

    // 重定向到被屏蔽的页面
    function redirectToBlockedPage() {
        window.location.href = 'https://qipantanyi.github.io/HttpBlackList/access-denied.html';
    }
})();