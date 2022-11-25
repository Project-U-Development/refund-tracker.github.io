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
// Validation message function//
   let inputElementMail = document.getElementById("eMail");
   let helpMessageMail = document.getElementById('invalidEmail');
   let divMistakeMail = document.getElementById('messageRedEmail');
   inputElementMail.addEventListener ('input', showErrorMessageEmail);
   
function showErrorMessageEmail() {
   if (inputElementMail.checkValidity()) {
      helpMessageMail.style.display = "none";
      divMistakeMail.style.position = "absolute";
   }
   else if (!inputElementMail.checkValidity()) {
      helpMessageMail.style.display = "block";
      divMistakeMail.style.position = "relative";
   }
      else {
      helpMessageMail.style.display = "none";
      divMistakeMail.style.position = "absolute";
   }  
}

let inputElementUser = document.getElementById("newUserName");
   let helpMessageUser = document.getElementById('invalidUser');
   let divMistakeUser = document.getElementById('messageRedUser');
   inputElementUser.addEventListener ('input', showErrorMessageUser);
   
function showErrorMessageUser() {
   if  (inputElementUser.checkValidity()) {
      helpMessageUser.style.display = "none";
      divMistakeUser.style.position = "absolute";
   }
   else if (!inputElementUser.checkValidity()) {
      helpMessageUser.style.display = "block";
      divMistakeUser.style.position = "relative";
   }
      else {
      helpMessageUser.style.display = "none";
      divMistakeUser.style.position = "absolute";
   }  
}

   let inputElementPassword1 = document.getElementById("password1");
   let helpMessagePassword1 = document.getElementById('invalidPassword1');
   let divMistakePassword1 = document.getElementById('messageRedPassword1');
   inputElementPassword1.addEventListener ('input', showErrorMessagePassword1);
   
function showErrorMessagePassword1() {
   if (inputElementPassword1.checkValidity()) {
      helpMessagePassword1.style.display = "none";
      divMistakePassword1.style.position = "absolute";
   }
   else if (!inputElementPassword1.checkValidity()) {
      helpMessagePassword1.style.display = "block";
      divMistakePassword1.style.position = "relative";
   }
      else {
      helpMessagePassword1.style.display = "none";
      divMistakePassword1.style.position = "absolute";
   }  
}

   let inputElementPassword2 = document.getElementById("password2");
   let helpMessagePassword2 = document.getElementById('invalidPassword2');
   let divMistakePassword2 = document.getElementById('messageRedPassword2');
   inputElementPassword2.addEventListener ('input', showErrorMessagePassword2);
   
function showErrorMessagePassword2() {
   if (inputElementPassword2.checkValidity()){
      helpMessagePassword2.style.display = "none";
      divMistakePassword2.style.position = "absolute";
   }
   else if (inputElementPassword2 !== inputElementPassword1) {
      helpMessagePassword2.style.display = "block";
      divMistakePassword2.style.position = "relative";
   }
      else {
      helpMessagePassword2.style.display = "none";
      divMistakePassword2.style.position = "absolute";
   }  
}



