export const setEnvironmentAttributes = () => {
    const formFieldElements = document.querySelectorAll('.form-field');

    if (formFieldElements.length) {
        formFieldElements.forEach((formFieldElement, idx) => {
            const orderNumber = (idx + 1).toString();
            const envNumberElement = envElement.querySelector('.environment__number');
            const formFieldElements = envElement.querySelectorAll('.form-field');

            envNumberElement.textContent = orderNumber;

            if (formFieldElements.length) {
                Array.from(formFieldElements).forEach(formFieldElement => {
                    const labelNode = formFieldElement.querySelector('label');
                    const inputNode = formFieldElement.querySelector('input');

                    const identifier = `${context}-env-${orderNumber}-${labelNode.textContent.toLowerCase()}`;
                    labelNode.setAttribute('for', identifier);
                    inputNode.setAttribute('id', identifier);
                });
            }
        });
    }
};