import {createElement} from "./create-element";
import {createSiteForm} from "./create-site-form";

export const addSite = () => {
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
