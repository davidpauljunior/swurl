const collateEnvs = form => {
    const envElements = Array.from(form.querySelectorAll('.environment'));

    if (envElements.length) {
        return envElements.map(envElement => {
            const fieldElements = envElement.querySelectorAll('.form-field');
            if (fieldElements.length) {
                return Array.from(fieldElements).reduce((acc, curr) => {
                    const label = curr.querySelector('label');
                    const input = curr.querySelector('input');

                    acc[label.textContent.trim().toLowerCase()] = input.value;

                    return acc;
                }, {});
            }
        });
    }
};

export const saveSite = form => {
    const siteNameField = form.querySelector('.form-field');
    const siteNameInput = siteNameField.querySelector('input');

    const collatedEnvData =  collateEnvs(form);

    // TODO: What to do with this?
    // If it was new can push
    // Otherwise,
    const siteObject = {
        'name': siteNameInput.value,
        'environments': collatedEnvData
    };
};

// const populateSitesStore = form => {
//     const siteNameField = form.querySelector('.form-field');
//     const siteNameInput = siteNameField.querySelector('input');
//     const envs = Array.from(form.querySelectorAll('.environment'));
//
//     const collatedEnvs =  envs.map(env => {
//         const fields =Array.from(env.querySelectorAll('.form-field'));
//
//         return fields.reduce((acc, curr) => {
//             const label = curr.querySelector('label');
//             const input = curr.querySelector('input');
//
//             acc[label.textContent.trim().toLowerCase()] = input.value;
//
//             return acc;
//         }, {});
//     });
//
//     const siteObject = {
//         'name': siteNameInput.value,
//         'environments': collatedEnvs
//     };
//
//     siteStore.push(siteObject);
//
//     // TODO: Organise the siteStore now, or when fetch?
//     // sortSiteStore(siteStore);
// };

// const save = form => {
//     const inputs = form.querySelectorAll('input');
//
//     let validCount = 0;
//
//     Array.from(inputs).forEach(input => {
//         if (input.value.trim().length === 0) {
//             input.classList.add('error')
//         } else {
//             validCount ++;
//         }
//     });
//
//     populateSitesStore(form);
//
//     // if (validCount === inputs.length) {
//     //     const siteObj = {};
//     // }
//
//     // if (validCount === inputs.length) {
//     //     chrome.storage.sync.set({
//     //         sites: {
//     //             name: siteNameInput.trim(),
//     //             environments: {
//     //
//     //             }
//     //         }
//     //     }, function() {
//     //         console.log('Value is set to ' + value);
//     //     });
//     // }
// };