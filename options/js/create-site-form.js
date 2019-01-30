import {createFormField} from "./create-form-field";
import {createElement} from "./create-element";
// import {removeElement} from "./remove-element";
import {createEnvironment} from "./create-environment";
import {addNewEnvironment} from "./add-new-environment";
import {saveSite} from "./save-site";

export const createSiteForm = () => {
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
        saveSite(formElement);
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