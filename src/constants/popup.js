// Get extension toggle states from chrome storage
export const getSwitchStates = async () => {
    const switchStates = await chrome.storage.sync.get([
        'articleSwitch',
    ]);
    return switchStates;
}

// Set switch states when toggled
export const updateSwitchState = async (switchName) => {
    const storageObject = await chrome.storage.sync.get([switchName]);
    const switchState = storageObject[switchName];
    const newState = switchState !== undefined ? !switchState : true;
    await chrome.storage.sync.set({ [switchName]: newState });
    chrome.runtime.sendMessage({ checkStates: switchName });
    return newState;
}

// Get blocked keyword list
export const getKeywordList = async () => {
    const { keywordList } = await chrome.storage.sync.get(['keywordList']);
    if (keywordList && keywordList.length > 0) {
        chrome.runtime.sendMessage({ keywordList: true });
        return keywordList;
    } else {
        chrome.runtime.sendMessage({ checkStates: true });
        return [];
    }
}

// Get blocked links list
export const getLinkList = async () => {
    const { linkList } = await chrome.storage.sync.get(['linkList']);
    if (linkList && linkList.length > 0) {
        chrome.runtime.sendMessage({ linkList: true });
        return linkList;
    } else {
        chrome.runtime.sendMessage({ checkStates: true });
        return [];
    }
}

// Update block list
export const updateBlockList = async (item, action, list) => {
    if (list === 'keyword') {
        if (action === 'add') {
            const { keywordList } = await chrome.storage.sync.get(['keywordList']);
            if (keywordList && keywordList.length > 0) {
                await chrome.storage.sync.set({ keywordList: [...keywordList, item] });
            } else {
                await chrome.storage.sync.set({ keywordList: [item] });
            }
            chrome.runtime.sendMessage({ keywordList: 'add' });
        } else if (action === 'remove') {
            const { keywordList } = await chrome.storage.sync.get(['keywordList']);
            const updatedKeywordList = keywordList.filter(oldItem => oldItem !== item);
            await chrome.storage.sync.set({ keywordList: updatedKeywordList });
        } else if (action === 'clear') {
            await chrome.storage.sync.set({ keywordList: [] });
        }
    }
    if (list === 'link') {
        if (action === 'add') {
            const { linkList } = await chrome.storage.sync.get(['linkList']);
            if (linkList && linkList.length > 0) {
                await chrome.storage.sync.set({ linkList: [...linkList, item] });
            } else {
                await chrome.storage.sync.set({ linkList: [item] });
            }
            chrome.runtime.sendMessage({ linkList: 'add' });
        } else if (action === 'remove') {
            const { linkList } = await chrome.storage.sync.get(['linkList']);
            const updatedLinkList = linkList.filter(oldItem => oldItem !== item);
            await chrome.storage.sync.set({ linkList: updatedLinkList });
        } else if (action === 'clear') {
            await chrome.storage.sync.set({ linkList: [] });
        }
    }
}