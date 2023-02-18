import { startUserSession } from './startUserSession.mjs'

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

const handleResponse = (res) => {
   if (res.status === 400) {
      throw new Error(`User with such email exist`);
   } else {
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
      .then(handleResponse)
      .then(function (res) {
         const accessToken = res.accessToken.split(" ")[1];
         startUserSession(accessToken);
      })
      .catch(err => {
         throw err;
      });
}

main();

function showErrorMessage(err) {
   const message = document.getElementById('submitErrorMessage');
   message.innerHTML = err;
}