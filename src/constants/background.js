// On initial install or on extension update, set the state of
// the extension, the toggle buttons in popup.js, and reload any
// active tabs
chrome.runtime.onInstalled.addListener(async (details) => {
    if (details.reason === 'install') {
        chrome.storage.sync.set({
            toggleState: true
        }).catch(() => { console.log('[STORAGE] Could not set storage item') });
        chrome.tabs.query({ url: ['https://www.reddit.com/*'] }, function (tabs) {
            tabs.forEach(tab => {
                chrome.tabs.reload(tab.id);
            });
        });
    }
});

// Get stored switch states
function checkStates() {
    // If the extension is unloaded or updated, reload the page to terminate orphaned scripts
    if (!chrome.runtime.id) return location.reload();
    // Get extension toggle states from chrome storage
    return chrome.storage.sync.get([
        'toggleState',
        'keywordList',
        'linkList',
        'articleSwitch'
    ]);
}

// Handle messages sent from the extension popup
chrome.runtime.onMessage.addListener(async function (message, sender, sendResponse) {
    if (message.checkStates) {
        // Get extension toggle states
        const states = await checkStates();
        chrome.tabs.query({ url: ['https://www.reddit.com/*'] }, function (tabs) {
            tabs.forEach(tab => {
                if (states.articleSwitch) hideAllArticles(tab.id);
            });
        });
    }
    if (message.keywordList) {
        // Get extension toggle states
        const states = await checkStates();
        chrome.tabs.query({ url: ['https://www.reddit.com/*'] }, function (tabs) {
            tabs.forEach(tab => {
                if (message.keywordList === 'add') hideBlockedKeywords(tab.id, states.keywordList);
            });
        });
    }
    if (message.linkList) {
        // Get extension toggle states
        const states = await checkStates();
        chrome.tabs.query({ url: ['https://www.reddit.com/*'] }, function (tabs) {
            tabs.forEach(tab => {
                if (message.linkList === 'add') hideBlockedLinks(tab.id, states.linkList);
            });
        });
    }
});

// Handle tabs when they are updated
chrome.tabs.onUpdated.addListener(async function (tabId, changeInfo, tab) {
    // If the extension is unloaded or updated, return
    if (!chrome.runtime.id) return;
    // Only continue if the url matches a youtube URL
    if (tab.url.startsWith('https://www.reddit.com/')) {
        // Get extension toggle states
        const states = await checkStates();
        console.log(states);
        // If the main state is off, return
        if (!states.toggleState) return;
        if (changeInfo.status !== 'loading') return;

        if (states.articleSwitch) hideAllArticles(tabId);
        if (states.keywordList && states.keywordList.length > 0) hideBlockedKeywords(tabId, states.keywordList);
        if (states.linkList && states.linkList.length > 0) hideBlockedLinks(tabId, states.linkList);
    }
});

function hideAllArticles(tabId) {
    chrome.scripting.executeScript({
        target: { tabId: tabId },
        function: () => {
            setInterval(() => {
                // Remove all article type posts
                var articles = document.querySelectorAll('article');
                articles.forEach(function (article) {
                    var parentElement = article.parentNode.parentNode.parentNode;
                    parentElement.style.display = 'none';
                });
            }, 500);
        }
    });
}

function hideBlockedKeywords(tabId, list) {
    list.forEach(itemInList => {
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            function: (itemInList) => {
                setInterval(() => {
                    // Find all posts with heading containing specific keyword
                    var element = document.querySelectorAll('h3');
                    element.forEach(function (el) {
                        if (el.innerText.toLowerCase().includes(itemInList)) {
                            const parentElement = el.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
                            parentElement.style.display = 'none';
                        }
                    });
                    // Find all posts with body containing specific keyword
                    var element = document.querySelectorAll('p');
                    element.forEach(function (el) {
                        if (el.innerText.toLowerCase().includes(itemInList)) {
                            const parentElement = el.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
                            parentElement.style.display = 'none';
                        }
                    });
                }, 500);
            },
            args: [itemInList]
        });
    });
}

function hideBlockedLinks(tabId, list) {
    list.forEach(itemInList => {
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            function: (itemInList) => {
                setInterval(() => {
                    // Find all articles with a matching url
                    var element = document.querySelectorAll('a');
                    element.forEach(function (el) {
                        if (el.innerText.toLowerCase().includes(itemInList)) {
                            // Make sure the element to remove is actually an article
                            const isArticle = el.parentNode.parentNode.parentNode.tagName.toLowerCase() === 'article';
                            if (isArticle) {
                                const parentElement = el.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
                                parentElement.style.display = 'none';
                            }
                        }
                    });
                }, 500);
            },
            args: [itemInList]
        });
    });
}