import { startUserSession } from './startUserSession.mjs'

function main() {
   const form = document.getElementById("loginForm");
   form.onsubmit = function (event) {
      event.preventDefault();
      const data = getLoginData(event.target);
      login(data);
   };
}

function getLoginData(form) {
   const formData = new FormData(form);
   const email = formData.get("email");
   const password = formData.get("password");
   return { email, password };
}

const apiUrl =
   window.origin === "http://localhost:3000"
      ? "http://localhost:80"
      : "http://ec2-18-197-163-2.eu-central-1.compute.amazonaws.com";

const handlerResponse = (res) => {
   switch (res.status) {
      case 401: alert('Password is not correct! Use link "Forgot password?" for password reset');
         break;
      case 404: alert('There is no user with specified email! Use link "Do not have an account yet" for registration');
         break;
      case 202: return res.json();
   }
}

function login(data) {
   fetch(`${apiUrl}/login`, {
      method: "POST",
      headers: {
         "content-type": "application/json",
      },
      body: JSON.stringify({
         userMail: data.email,
         userPassword: data.password,
      }),
   })
      .then(handlerResponse)
      .then(function (res) {
         const accessToken = res.accessToken.split(" ")[1];
         startUserSession(accessToken);
      })
      .catch(function (res) {
         console.log(res);
      });
}
main();
