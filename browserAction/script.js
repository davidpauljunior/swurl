function createContent() {
    const container = document.querySelector('[data-swurl-container]');
    const button = document.createElement('button');
    button.textContent = 'Cool button';
    button.addEventListener('click', () => {
        if (chrome.runtime.openOptionsPage) {
            chrome.runtime.openOptionsPage();
        } else {
            window.open(chrome.runtime.getURL('options.html'));
        }
    });

    container.append(button);
}

chrome.storage.sync.get(['sites'], result => {
    // if there are sites, need to then check if the current url matches the domain of whatever is saved
    if (!result.sites) {
        createContent(result)
    }
});