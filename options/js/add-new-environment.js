// import {setEnvironmentAttributes} from "./set-environment-attributes";
import {createEnvironment} from "./create-environment";

export const addNewEnvironment = button => {
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