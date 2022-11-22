function showPasswordFunction() {
  const inputPasswordFirst = document.getElementById("password1");
  const inputPasswordSecond = document.getElementById("password2");
  const Status = (input) => (input.type === 'password') ? 'text' : 'password';
  inputPasswordFirst.type = Status(inputPasswordFirst);
  inputPasswordSecond.type = Status(inputPasswordSecond);
}


const inputs = document.getElementsByClassName('registerFormInput');
for (let item of inputs) {
  item.addEventListener('change', checkInputValidation)
}

function checkInputValidation() {
  let validate = true;
  for (let item of inputs) {
     if (!item.checkValidity()) {
        validate = false;
     }
  }
  (validate) ? document.getElementById('createAccount').disabled = false : document.getElementById('createAccount').disabled = true;
}

