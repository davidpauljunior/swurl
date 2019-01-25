/** Collapse **/

// const collapse = (dataId, cmd) => {
//     const classListFnMap = {
//         'toggle': 'toggle',
//         'show': 'add',
//         'hide': 'remove'
//     };
//
//     const targets = document.querySelectorAll(`[data-cpt-id='${dataId}']`);
//
//     console.log(targets);
//
//     if (targets.length) {
//         Array.from(targets).forEach(target => {
//             console.log(target);
//             target.classList[classListFnMap[cmd]]('show');
//         })
//     }
// };

// const collapseControllers = document.querySelectorAll('[data-cpt-collapse]');
// if (collapseControllers.length) {
//     window.addEventListener('click', e => {
//         const el = e.target;
//
//         if (collapseControllers.includes(el)) {
//             const selector = el.hasAttribute('data-cpt-controls') && el.getAttribute('data-cpt-controls');
//
//             if (selector) {
//                 collapse(selector, 'toggle');
//             }
//         }
//     }, false);
// }