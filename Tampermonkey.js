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
                // 检查是否需要重定向
                if (shouldRedirect()) {
                    redirectToBlockedPage();
                }
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
        // 这里不需要执行任何操作，因为检查已经在script.onload中完成
    });

    // 检查当前访问的网站是否在屏蔽列表中
    function shouldRedirect() {
        var blockedHostnames = window.blockedUrls.map(function(url) {
            return new URL(url).hostname;
        });
        return blockedHostnames.includes(location.hostname);
    }

    // 重定向到被屏蔽的页面
    function redirectToBlockedPage() {
        window.location.href = 'https://qipantanyi.github.io/HttpBlackList/access-denied.html';
    }

    // 立即执行一次检查，如果需要重定向，则显示警告并重定向
    if (window.blockedUrls && Array.isArray(window.blockedUrls)) {
        if (shouldRedirect()) {
            alert('访问的网站被屏蔽！');
        }
    }
})();