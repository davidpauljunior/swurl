import {createFormField} from "./create-form-field";
import {createElement} from "./create-element";

export const createEnvironment = orderNumber => {
    const order = orderNumber.toString();
    const fieldsetElement = createElement('fieldset', {classNames: ['environment']});
    fieldsetElement.appendChild(createElement('h4', {content: order, classNames: ['environment__number']}));
    fieldsetElement.appendChild(createFormField('Name'));
    fieldsetElement.appendChild(createFormField('Url'));

    return fieldsetElement;
};