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
// import { inputListener } from '../input/input.mjs';

// inputListener('logInFormInput', 'input', checkInputValidationLogIn);
// function checkInputValidationLogIn() {
//    const inputs = document.getElementsByClassName('logInFormInput');
//    let validate = true;
//    for (let item of inputs) {
//       if (!item.checkValidity()) {
//          validate = false;
//       }
//    }
//    (validate) ? document.getElementById('logInButton').disabled = false : document.getElementById('logInButton').disabled = true;
// }

// const inputs = document.getElementsByClassName(className);
// inputs.forEach(item => item.addEventListener(listenType, inputFunction));

// const inputs = document.getElementsByClassName('logInFormInput');
// inputs.forEach(item => item.addEventListener('input', checkInputValidationLogIn));

// function checkInputValidationLogIn() {
//       let validate = true;
//       for (let item of inputs) {
//          if (!item.checkValidity()) {
//             validate = false;
//          }
//       }
//       (validate) ? document.getElementById('logInButton').disabled = false : document.getElementById('logInButton').disabled = true;
//    }

// const inputs = document.querySelectorAll('.logInFormInput');
// const logInButton = document.getElementById('logInButton');

// inputs.forEach(item => item.addEventListener('input', checkInputsValidity));

// function checkInputsValidity() {
//   let validate = true;
//   for (let item of inputs) {
//     if (!item.checkValidity()) {
//       validate = false;
//     }
//   }
//   logInButton.disabled = !validate;
// }

// export function addInputListenersById(elementIds, listenType, inputFunction) {
//    for (const elementId of elementIds) {
//      const element = document.getElementById(elementId);
//      element.addEventListener(listenType, inputFunction);
//    }
//  }