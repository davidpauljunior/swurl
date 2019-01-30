/** TODO:
 * Get object from store and assign to var
 * loop through that to create existing sites
 * When you create new site, edit or remove an existing site, push into that object, then call an 'updateSites'
 * function that will rerender the sites.
 *
 * Maybe - do a deep object comparison to see if anything changed.  If it did, push to chrome store.
 */

import {addSite} from "./js/add-site";

document.addEventListener('DOMContentLoaded', () => {
    /** TEMP CODE TO CLEAR CHROME STORAGE **/
    const clearButton = document.querySelector('[data-swurl-clear]');
    clearButton.addEventListener('click', () => {
        chrome.storage.sync.remove('sites', () => { console.log('storage cleared')});
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