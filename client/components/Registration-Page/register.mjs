import { inputListener } from '../input/input.mjs';

inputListener('registerFormInput', 'input', checkInputValidation);
function checkInputValidation() {
   const inputs = document.getElementsByClassName('registerFormInput');
   let validate = true;
   for (let item of inputs) {
      if (item.id === 'password1') {
         checkPasswords(item);
      }
      if (!item.checkValidity()) {
         validate = false;
      }
   }
   (validate) ? document.getElementById('createAccount').disabled = false : document.getElementById('createAccount').disabled = true;
}

function checkPasswords(item) {
   const passwordVarification = document.getElementById('password2');
   (item.value != '') ? passwordVarification.setAttribute('pattern', item.value) : passwordVarification.setAttribute('pattern', '');
}

inputListener('inputCheckbox', 'input', showPassword);
function showPassword() {
   const inputPasswordFirst = document.getElementById("password1");
   const inputPasswordSecond = document.getElementById("password2");
   const Status = (input) => (input.type === 'password') ? 'text' : 'password';
   inputPasswordFirst.type = Status(inputPasswordFirst);
   inputPasswordSecond.type = Status(inputPasswordSecond);
}

