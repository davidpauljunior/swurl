const input = document.querySelector('[data-swurl-input]');
const saveButton = document.querySelector('[data-swurl-save]');

saveButton.addEventListener('click', () => {
    if (input.value) {
        chrome.storage.sync.set({'sites': 'url'}, () => {
            // todo check the message() method
        });
    }
});