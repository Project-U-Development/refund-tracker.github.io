function main() {
   const form = document.getElementById("newPasswordForm");
   form.onsubmit = function (event) {
      event.preventDefault();
      const data = getNewPassword(event.target);
      const token = window.location.href.split('#')[1];
      resetPassword(data, token);
   };
}

function getNewPassword(form) {
   const formData = new FormData(form);
   const password = formData.get("password");
   return { password };
}

const apiUrl =
   window.origin === "http://localhost:3000"
      ? "http://localhost:80"
      : "http://ec2-18-197-163-2.eu-central-1.compute.amazonaws.com";

const handlerResponse = (res) => {
   switch (res.status) {
      case 400: alert('A password was not reset before. Please, go through the forget password procedure');
         window.location.href = "/forgotPassword"
         break;
      case 401: alert('Reset password link is expired or token is not verified!');
         window.location.href = "/forgotPassword"
         break;
      case 202: alert('Password was changed successfully. Please, go through the login procedure');
         window.location.href = "/";
   }
}

async function resetPassword(data, token) {
   return fetch(`${apiUrl}/resetpassword`, {
      method: "POST",
      headers: {
         'content-type': 'application/json',
         'Authorization': token
      },
      body: JSON.stringify({
         newPassword: data.password,
      })
   })
      .then(handlerResponse)
      .catch(res => {
         console.log(res);
      });

}

main();