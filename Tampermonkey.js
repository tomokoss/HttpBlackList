// ==UserScript==
// @name         网站屏蔽示例
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  尝试在访问被屏蔽的网站时显示警告并关闭页面
// @author       tanz
// @match        *://*/*
// @grant        none
// @connect      yourusername.github.io
// ==/UserScript==

(function() {
    'use strict';

    // 动态加载远程JavaScript文件
    function loadScript(url, callback) {
        var script = document.createElement('script');
        script.onload = function() {
            if (typeof callback === 'function') {
                callback();
            }
        };
        script.src = url;
        document.head.appendChild(script);
    }

    // 加载远程屏蔽列表
    var remoteListUrl = 'https://qipantanyi.github.io/HttpBlackList/blocklist.js';
    loadScript(remoteListUrl, function() {
        // 确保远程列表已加载并命名为window.blockedUrls
        if (window.blockedUrls) {
            checkAndBlockSites(window.blockedUrls);
        } else {
            console.error('blockedUrls not defined in the loaded script.');
        }
    });

    // 检查并屏蔽网站
    function checkAndBlockSites(blockedUrls) {
        for (var i = 0; i < blockedUrls.length; i++) {
            if (location.href.startsWith(blockedUrls[i])) {
                alert('访问的网站被屏蔽！');
                window.close(); // 关闭当前页面
                return;
            }
        }
    }
})();