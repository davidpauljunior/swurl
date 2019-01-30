// TODO

const messages = {
    save: {
        type: 'info',
        text: 'Site McSaved face'
    },
    error: {
        type: 'error',
        text: 'Something went wrong'
    }
};

const createMessage = action => {
    const node = document.createElement('div');
    node.className = `message message--${messages[action].type} mb-3`;
    node.textContent = messages[action].text;

    messageContainer.appendChild(node);
};