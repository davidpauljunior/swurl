export const createElement = (tag = 'div', {
    content = '',
    classNames = []
} = {}) => {
    const element = document.createElement(tag);
    element.textContent = content;
    element.classList.add(...classNames);

    return element;
};