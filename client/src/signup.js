import { startUserSession } from './startUserSession.mjs'
import { inputListener } from '../components/input/input.mjs';

const inputs = document.getElementsByClassName('registerFormInput');
const errorMessage = document.getElementById('submitErrorMessage');
inputListener(inputs, 'input', clearErrorMessage);

function clearErrorMessage() {
   showErrorMessage('')
}

function showErrorMessage(err) {
   errorMessage.innerHTML = err;
}

function main() {
   const form = document.getElementById('registerForm');
   form.onsubmit = function (event) {
      event.preventDefault();
      const data = getLoginData(event.target);
      signup(data)
         .catch((err) => {
            showErrorMessage(err)
         });
   }
}

function getLoginData(form) {
   const formData = new FormData(form);
   const email = formData.get('email');
   const password1 = formData.get('password1');
   return { email, password1 }
}

const apiUrl = window.origin === 'http://localhost:3000' ? 'http://localhost:80' : 'http://ec2-18-197-163-2.eu-central-1.compute.amazonaws.com';

const handlerResponse = (res) => {
   switch (res.status) {
      case 400: throw new Error('User with such email exist');
      case 403: throw new Error('Please, provide a valid email address');
      case 201: alert('User is registered successfully');
         return res.json();
   }
}

async function signup(data) {
   return fetch(`${apiUrl}/signup`, {
      method: 'POST',
      headers: {
         'content-type': 'application/json'
      },
      body: JSON.stringify({
         userMail: data.email,
         userPassword: data.password1
      })
   })
      .then(handlerResponse)
      .then(function (res) {
         const accessToken = res.accessToken.split(" ")[1];
         startUserSession(accessToken);
      })
      .catch(err => {
         throw err;
      });
}

main();