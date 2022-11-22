function showPasswordFunction() {
<<<<<<< HEAD
  const inputPasswordFirst = document.getElementById("password1");
  const inputPasswordSecond = document.getElementById("password2");
  const Status = (input) => (input.type === 'password') ? 'text' : 'password';
  inputPasswordFirst.type = Status(inputPasswordFirst);
  inputPasswordSecond.type = Status(inputPasswordSecond);
=======
   const inputPasswordFirst = document.getElementById("password1");
   const inputPasswordSecond = document.getElementById("password2");
   const Status = (input) => (input.type === 'password') ? 'text' : 'password';
   inputPasswordFirst.type = Status(inputPasswordFirst);
   inputPasswordSecond.type = Status(inputPasswordSecond);
>>>>>>> 4e996c410f7525359052fd197b41e99b6784ac2d
}


const inputs = document.getElementsByClassName('registerFormInput');
for (let item of inputs) {
<<<<<<< HEAD
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

=======
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
>>>>>>> 4e996c410f7525359052fd197b41e99b6784ac2d
