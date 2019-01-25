/** TODO:
 * Get object from store and assign to var
 * loop through that to create existing sites
 * When you create new site, edit or remove an existing site, push into that object, then call an 'updateSites'
 * function that will rerender the sites.
 *
 * Maybe - do a deep object comparison to see if anything changed.  If it did, push to chrome store.
 */

/** TEMP CODE TO CLEAR CHROME STORAGE **/

const clearButton = document.querySelector('[data-swurl-clear]');
clearButton.addEventListener('click', () => {
    chrome.storage.sync.remove('sites', () => { console.log('storage cleared')});
});

/** END TEMP CODE **/

const addSiteButton = document.querySelector('[data-cpt-add-new-site]');
const siteContainer = document.querySelector('[data-cpt-site-container]');
const messageContainer = document.querySelector('[data-cpt-message-container]');
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

let appendedNewSiteNode;

const setEnvOrderAttributes = (form, context) => {
    if (context === 'new') {
        const envNodes = form.querySelectorAll('.environment');

        if (envNodes.length) {
            Array.from(envNodes).forEach((envNode, idx) => {
                const orderNumber = (idx + 1).toString();
                const envNumberNode = envNode.querySelector('.environment__number');
                const formFieldNodes = envNode.querySelectorAll('.form-field');

                envNumberNode.textContent = orderNumber;

                if (formFieldNodes.length) {
                    Array.from(formFieldNodes).forEach(formFieldNode => {
                        const labelNode = formFieldNode.querySelector('label');
                        const inputNode = formFieldNode.querySelector('input');

                        const identifier = `${context}-env-${orderNumber}-${labelNode.textContent.toLowerCase()}`;
                        labelNode.setAttribute('for', identifier);
                        inputNode.setAttribute('id', identifier);
                    });
                }
            });
        }
    } else {
        console.log('context wasn\'t "new"');
    }
};

const createFormField = (label, classNames) => {
    const node = document.createElement('div');
    node.className = classNames === undefined ? 'form-field' : `form-field ${classNames}`;

    // TODO: create `for` and `id`
    const labelNode = document.createElement('label');
    labelNode.className = 'form-field__label';
    labelNode.textContent = label;

    const inputNode = document.createElement('input');
    inputNode.type = 'text';
    inputNode.className = 'form-field__control';

    node.appendChild(labelNode);
    node.appendChild(inputNode);

    return node;
};

const createButton = (type, text) => {
    const node = document.createElement('button');
    node.type = type;
    node.textContent = text;

    return node;
};

const addEnvListenerCb = button => {
    const closestForm = button.closest('form');

    const node = createEnvironment(button);
    const envNodes = Array.from(closestForm.querySelectorAll('.environment'));
    const lastEnvNode = envNodes[envNodes.length - 1];

    lastEnvNode.parentNode.insertBefore(node, lastEnvNode.nextSibling);
    setEnvOrderAttributes(closestForm, 'new');
};

const createSiteActions = () => {
    const node = document.createElement('div');
    node.className = 'flex flex--space-between';

    const addEnvButton = createButton('button', 'Add environment');
    const cancelButton = createButton('button', 'Cancel');
    const saveButton = createButton('submit', 'Save');

    addEnvButton.addEventListener('click', (e) => addEnvListenerCb(e.target));

    cancelButton.addEventListener('click', () => {
        appendedNewSiteNode.parentNode.removeChild(appendedNewSiteNode); // TODO: Extract - save needs to do this too
        appendedNewSiteNode = undefined;
        addSiteButtonToggleState();
    });

    const flexGroup = () => {
        const node = document.createElement('div');
        node.appendChild(cancelButton);
        node.appendChild(saveButton);

        return node;
    };

    node.appendChild(addEnvButton);
    node.appendChild(flexGroup());

    return node;
};

const createEnvironment = () => {
    const node = document.createElement('fieldset');
    node.className = 'environment';

    const envNumberNode = document.createElement('h4');
    envNumberNode.className = 'environment__number';
    const nameField = createFormField('Name');
    const urlField = createFormField('Url');

    node.appendChild(envNumberNode);
    node.appendChild(nameField);
    node.appendChild(urlField);

    return node;
};

const createMessage = action => {
    const node = document.createElement('div');
    node.className = `message message--${messages[action].type} mb-3`;
    node.textContent = messages[action].text;

    messageContainer.appendChild(node);
};

const save = form => {
    // TODO: Create an object for the site.
    const inputs = form.querySelectorAll('input');

    let validCount = 0;

    Array.from(inputs).forEach(input => {
        if (input.value.trim().length === 0) {
            input.classList.add('error')
        } else {
            validCount ++;
        }
    });

    if (validCount === inputs.length) {
        chrome.storage.sync.set({
            sites: {
                name: 'gary'
            }
        }, function() {
            console.log('Value is set to ' + value);
        });
    }
};

const createSiteForm = () => {
    const node = document.createElement('form');
    const siteNameFieldNode = createFormField('Site name', 'mb-3');
    const siteActionsNode = createSiteActions();
    const envHeading = document.createElement('h4');
    envHeading.textContent = 'Environments';
    const envNode = createEnvironment();

    node.addEventListener('submit', e => {
        e.preventDefault();
        save(node);
    });

    node.appendChild(siteNameFieldNode);
    node.appendChild(envHeading);
    node.appendChild(envNode);
    setEnvOrderAttributes(node, 'new');
    node.appendChild(siteActionsNode);

    return node;
};

const createSite = () => {
    // TODO: Store an empty version of the created form for better performance

    const node = document.createElement('div');
    node.className = 'box';

    const formNode = createSiteForm();
    node.appendChild(formNode);

    return node;
};

const addSiteButtonToggleState = () => addSiteButton.hasAttribute('disabled') ? addSiteButton.removeAttribute('disabled') : addSiteButton.setAttribute('disabled', 'disabled');

addSiteButton.addEventListener('click', () => {
    addSiteButtonToggleState();
    const newSiteNode = createSite();

    appendedNewSiteNode = siteContainer.appendChild(newSiteNode);
});

chrome.storage.sync.get(['sites'], result => {
    if (result && result.sites) {
        console.log('results.sites', result.sites);
    } else {
        // TODO
        // createEntryView();
    }
});


// TODO: Once the site is added, show a success and then have an anchor link down to it 'view new site'?
// Or just link the 'site created' and do some magic highlight stuff

// TODO: Build the URL from what you have.  If user input makes a URL that is different, enable the save button.
// (works if the is no current url too)

// how to create a different key for each site?
// sites.bmc.live / sites.bmc.staging, .sites.nature.live etc
// sites: { name: nature, environments: { live: a.url.com, staging: a.url.com, local: a.url.com} }, { name: bmc,
// environments: {...} } }