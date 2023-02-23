function main() {
   const form = document.getElementById("forgotPasswordForm");
   form.onsubmit = function (event) {
      event.preventDefault();
      const data = getUserMail(event.target);
      forgotPassword(data);
   };
}

function getUserMail(form) {
   const formData = new FormData(form);
   const userMail = formData.get("email");
   return { userMail };
}

const apiUrl =
   window.origin === "http://localhost:3000"
      ? "http://localhost:80"
      : "http://ec2-18-197-163-2.eu-central-1.compute.amazonaws.com";

const handlerResponse = (res) => {
   switch (res.status) {
      case 404: alert('There is no user with specified email');
         break;
      case 202: alert('Reset password link was sent successfully. Please, go through the link in your Email box');
         window.location.href = "/";
   }
}

async function forgotPassword(data) {
   return fetch(`${apiUrl}/forgetpassword`, {
      method: "POST",
      headers: {
         'content-type': 'application/json'
      },
      body: JSON.stringify({
         userMail: data.userMail,
      })
   })
      .then(handlerResponse)
      .catch(res => {
         console.log(res);
      });
}

main();