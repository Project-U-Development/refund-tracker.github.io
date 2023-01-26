import { inputListener } from '../input/input.mjs';

const inputs = document.getElementsByClassName('logInFormInput');

inputListener(inputs, 'input', checkInputsValidity);
function checkInputsValidity() {
    let validate = true;
    for (let item of inputs) {
      if (!item.checkValidity()) {
        validate = false;
      }
    }
    logInButton.disabled = !validate;
  }

  const inputCheckbox = document.getElementsByClassName('inputCheckbox');
  inputListener(inputCheckbox, 'input', showPassword);
function showPassword() {
   const inputPasswordLogIn = document.getElementById("passwordLogIn");
   const getNewType = (input) => (input.type === 'password') ? 'text' : 'password';
   inputPasswordLogIn.type = getNewType(inputPasswordLogIn);
}
