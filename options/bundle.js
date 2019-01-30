(function () {
    'use strict';

    const createElement = (tag = 'div', {
        content = '',
        classNames = []
    } = {}) => {
        const element = document.createElement(tag);
        element.textContent = content;
        element.classList.add(...classNames);

        return element;
    };

    const createFormField = label => {
        const formFieldElement = createElement('div', {classNames: ['form-field']});

        // TODO: create `for` and `id`
        const labelElement = createElement('label', {content: label, classNames: ['form-field__label']});
        const inputElement = createElement('input', {content: label, classNames: ['form-field__control']});
        inputElement.type = 'text';

        formFieldElement.appendChild(labelElement);
        formFieldElement.appendChild(inputElement);

        return formFieldElement;
    };

    const createEnvironment = orderNumber => {
        const order = orderNumber.toString();
        const fieldsetElement = createElement('fieldset', {classNames: ['environment']});
        fieldsetElement.appendChild(createElement('h4', {content: order, classNames: ['environment__number']}));
        fieldsetElement.appendChild(createFormField('Name'));
        fieldsetElement.appendChild(createFormField('Url'));

        return fieldsetElement;
    };

    // import {setEnvironmentAttributes} from "./set-environment-attributes";

    const addNewEnvironment = button => {
        const formElement = button.closest('form');
        const envElements = formElement.querySelectorAll('.environment');

        if (envElements.length) {
            const newEnvElement = createEnvironment(envElements.length + 1);
            const lastEnvElement = envElements[envElements.length - 1];

            lastEnvElement.parentNode.insertBefore(newEnvElement, lastEnvElement.nextSibling);

            // setEnvironmentAttributes(envElements, 'new');
            // var event = new Event('build');
            // TODO: Emit an event that an attribute updater can listen to
        }
    };

    const createSiteForm = () => {
        // Form
        const formElement = createElement('form');
        const formFieldSiteName = createFormField('Site name');
        formFieldSiteName.classList.add('mb-3');
        formElement.appendChild(formFieldSiteName);

        // Environments
        formElement.appendChild(createElement('h4', {content: 'Environments'}));
        formElement.appendChild(createEnvironment(1));

        // Form actions
        const actionsElement = createElement('div', {classNames: ['flex', 'flex--space-between']});
        const addEnvElement = createElement('button', {content: 'Add environment', classNames: ['button', 'button--link']});
        const flexGroupElement = createElement('div');
        const cancelElement = createElement('button', {content: 'Cancel', classNames: ['button', 'button--neutral', 'mr-1']});
        const saveElement = createElement('button', {content: 'Save site', classNames: ['button', 'button--positive']});
        cancelElement.type = 'button';
        cancelElement.type = 'submit';

        flexGroupElement.appendChild(cancelElement);
        flexGroupElement.appendChild(saveElement);

        actionsElement.appendChild(addEnvElement);
        actionsElement.appendChild(flexGroupElement);

        formElement.appendChild(actionsElement);

        // event listeners
        formElement.addEventListener('submit', e => {
            e.preventDefault();
            console.log(e);
            // save(node);
        });

        addEnvElement.addEventListener('click', e => {
            addNewEnvironment(e.target);
        });

        // Not gonna remove the box if it is being edited.
        // Need to check if new or if existing
        cancelElement.addEventListener('click', () => {
            // removeElement(boxElement); // TODO: Extract - save needs to do this too
            // addSiteButtonToggleState(); // TODO: pub sub event to disable save
            // If it's from add site, emit event a otherwise event b
        });

        return formElement;
    };

    const addSite = () => {
        const buttonElement = document.querySelector('[data-cpt-add-new-site]');
        const container = document.querySelector('[data-cpt-site-container]');

        if (!buttonElement) {
            console.error('Could not find an element with the "[data-cpt-add-new-site]" attribute');
            return;
        }

        buttonElement.addEventListener('click', () => {
            const fragment = document.createDocumentFragment();
            fragment.appendChild(createElement('h3', {content: 'New Site', classNames: ['h1']}));
            fragment.appendChild(createSiteForm()); // TODO: Clone this when save?

            container.appendChild(fragment);
        });
    };

    /** TODO:
     * Get object from store and assign to var
     * loop through that to create existing sites
     * When you create new site, edit or remove an existing site, push into that object, then call an 'updateSites'
     * function that will rerender the sites.
     *
     * Maybe - do a deep object comparison to see if anything changed.  If it did, push to chrome store.
     */

    document.addEventListener('DOMContentLoaded', () => {
        /** TEMP CODE TO CLEAR CHROME STORAGE **/
        const clearButton = document.querySelector('[data-swurl-clear]');
        clearButton.addEventListener('click', () => {
            chrome.storage.sync.remove('sites', () => { console.log('storage cleared');});
        });
        /** END TEMP CODE **/

        // const siteContainer = document.querySelector('[data-cpt-site-container]');
        // const messageContainer = document.querySelector('[data-cpt-message-container]');

        addSite();

        // chrome.storage.sync.get(['sites'], result => {
        //     // TODO: Type check for object?
        //     if (result.length) {
        //         siteStore = result;
        //     } else {
        //         siteStore = [];
        //         // createMessage();
        //     }
        // });
    });




    // let newSiteNode;
    // let siteStore;
    //
    // const addEnvListenerCb = button => {
    //     const closestForm = button.closest('form');
    //
    //     const node = createEnvironment(button);
    //     const envNodes = Array.from(closestForm.querySelectorAll('.environment'));
    //     const lastEnvNode = envNodes[envNodes.length - 1];
    //
    //     lastEnvNode.parentNode.insertBefore(node, lastEnvNode.nextSibling);
    //     setEnvOrderAttributes(closestForm, 'new');
    // };

    // const sortSiteStore = store => {
    //     const sorted = Object.entries(store);
    //     console.log(sorted.map(([test, test2]) => ({ a: test, b: test2})));
    //
    //     // TODO: How to sort alphabetically?
    //     // return Object.entries(store)
    //     //     .map(([horse, tipsters]) => ({ horse: horse, tipsters: tipsters }))
    //     //     .sort((a, b) => a.tipsters.length - b.tipsters.length);
    // };

    // const addSiteButtonToggleState = () => addSiteButton.hasAttribute('disabled') ? addSiteButton.removeAttribute('disabled') : addSiteButton.setAttribute('disabled', 'disabled');




    // TODO: Once the site is added, show a success and then have an anchor link down to it 'view new site'?
    // Or just link the 'site created' and do some magic highlight stuff

    // TODO: Build the URL from what you have.  If user input makes a URL that is different, enable the save button.
    // (works if the is no current url too)

    // how to create a different key for each site?
    // sites.bmc.live / sites.bmc.staging, .sites.nature.live etc
    // sites: { name: nature, environments: { live: a.url.com, staging: a.url.com, local: a.url.com} }, { name: bmc,
    // environments: {...} } }

}());
