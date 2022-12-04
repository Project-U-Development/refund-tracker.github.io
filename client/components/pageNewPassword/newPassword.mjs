import { inputListener } from '../input/input.mjs';

inputListener('inputNoLabel', 'input', checkInputValidation);

function checkInputValidation() {
    const inputs = document.querySelectorAll('.inputNoLabel');
    console.log('checkInputValidation')
    checkPasswords('password', 'passwordConfirmation');
    let validate = true;
    for (let input of inputs) {
        validate &= input.checkValidity();
    }
    document.querySelector('#buttonSetNewPassword').disabled = !validate;
}

function checkPasswords(pwd1, pwd2) {
    console.log('checkPasswords');
    const password1 = document.querySelector(`#${pwd1}`);
    const password2 = document.querySelector(`#${pwd2}`);
    console.log(password1.value);
    if (password1.value) {
        password2.setAttribute('pattern', password1.value);
    }
 }
 
 inputListener('inputCheckbox', 'input', showPassword);
 function showPassword() {
    const password1 = document.querySelector("#password");
    const password2 = document.querySelector("#passwordConfirmation");
    const getNewType = (input) => (input.type === 'password') ? 'text' : 'password';
    password1.type = getNewType(password1);
    password2.type = getNewType(password2);
 }