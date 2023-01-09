const password = document.querySelector('#password');
const confirmation = document.querySelector('#confirmation');
const checkbox = document.querySelector('#showPassword');

password.addEventListener('input', () => {
    setConfirmationPattern('password', 'confirmation');
    checkInputValidation('inputNoLabel','buttonSetNewPassword');
});

confirmation.addEventListener('input', () => {
    checkInputValidation('inputNoLabel','buttonSetNewPassword');
});

checkbox.addEventListener('input', () => {
    changePasswordVisibility('password');
    changePasswordVisibility('confirmation');
});

 /**
 * Checks validity of inputs of defuned class and enables submit button if all of them are valid
 * @param {string} inputClassName - The class name of inputs that will be validated
 * @param {string} buttonId - The ID of button that will be enabled if all inputs valid
 */
function checkInputValidation(inputClassName, buttonId) {
    const inputs = document.querySelectorAll(`.${inputClassName}`);
    let validate = true;
    for (let input of inputs) {
        validate &= input.checkValidity();
    }
    document.querySelector(`#${buttonId}`).disabled = !validate;
}

 /**
 * Defines pattern for the password confirmation input according to the value of the password input
 * @param {string} passwordId - The ID of password input
 * @param {string} confirmationID - The ID of password confirmation input
 */
function setConfirmationPattern(passwordId, confirmationID) {
    const password = document.querySelector(`#${passwordId}`);
    const confirmation = document.querySelector(`#${confirmationID}`);
    if (password.value) {
        confirmation.setAttribute('pattern', password.value);
    }
 }
 
 /**
 * Changes visibility of password in defined input
 * @param {string} inputId - The ID of input
 */
 function changePasswordVisibility(inputId) {
    const input = document.querySelector(`#${inputId}`);
    input.type = (input.type === 'password') ? 'text' : 'password';
 }

