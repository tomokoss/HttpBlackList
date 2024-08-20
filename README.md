# 油猴脚本使用说明

欢迎使用油猴脚本，本脚本可以帮助您屏蔽特定的网站，提高您的上网效率。

```javascript
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
```



## 功能介绍：

- 手动屏蔽不良网站以及你不想访问的站点。
- 支持自定义屏蔽列表，满足您的个性化需求。
- 点击弹窗确定后，自动关闭当前被屏蔽的页面。

## 如何使用：

1. 确保您已经在浏览器中安装了Tampermonkey扩展。
2. 访问油猴脚本的安装页面，点击“安装”按钮。
3. 安装完成后，脚本将自动运行，无需额外配置。

## 自定义屏蔽列表：

如果您想要自定义屏蔽的网站，可以按照以下步骤操作：

1. 访问托管在GitHub Pages上的 [blocklist.js](https://yourusername.github.io/yourrepo/blocklist.js) 文件。
2. 编辑该文件，添加或删除需要屏蔽的网站链接。
3. 保存文件，脚本将自动更新并应用新的屏蔽列表。

## 注意事项：

- 请确保您有权限编辑GitHub Pages上的文件。
- 脚本运行需要网络权限，如果您的浏览器弹出权限请求，请允许。
- 部分网站可能通过特殊方式绕过屏蔽，如果发现此类情况，请及时反馈。