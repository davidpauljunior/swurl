import {createElement} from './create-element';

export const createFormField = label => {
    const formFieldElement = createElement('div', {classNames: ['form-field']});

    // TODO: create `for` and `id`
    const labelElement = createElement('label', {content: label, classNames: ['form-field__label']});
    const inputElement = createElement('input', {content: label, classNames: ['form-field__control']});
    inputElement.type = 'text';

    formFieldElement.appendChild(labelElement);
    formFieldElement.appendChild(inputElement);

    return formFieldElement;
};