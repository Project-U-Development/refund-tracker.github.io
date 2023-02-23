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

const handleResponse = (res) => {
   console.log(res.status);
   switch (res.status) {
      case 400: alert('A password was not reset before. Please, go through the forget password procedure');
         break;
      case 404: alert('Reset password link is expired or token is not verified!');
         break;
      case 202: alert('Password was changed successfully. Please, go through the login procedure')
   }
   window.location.href = "/";
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
      .then(handleResponse)
      .catch(res => {
         console.log(res);
      });

}

main();