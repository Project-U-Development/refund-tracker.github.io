import { startUserSession } from './startUserSession.mjs'

function main() {
   const form = document.getElementById('registerForm');
   form.onsubmit = function (event) {
      event.preventDefault();
      const data = getLoginData(event.target);
      signup(data);
   }
}

function getLoginData(form) {
   const formData = new FormData(form);
   const email = formData.get('email');
   const password1 = formData.get('password1');
   return { email, password1 }
}

const apiUrl = window.origin === 'http://localhost:3000' ? 'http://localhost:80' : 'http://ec2-18-197-163-2.eu-central-1.compute.amazonaws.com';


function signup(data) {
   fetch(`${apiUrl}/signup`, {
      method: 'POST',
      headers: {
         'content-type': 'application/json'
      },
      body: JSON.stringify({
         userMail: data.email,
         userPassword: data.password1
      })
   })
      .then(function (res) {
         return res.json();
      })
      .then(function (res) {
         console.log(res);
         const accessToken = res.accessToken.split(" ")[1];
         startUserSession(accessToken);
      })
      .catch(function (res) { console.log(res) });
}

main();