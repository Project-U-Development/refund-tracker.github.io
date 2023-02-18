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

console.log(window.origin);
const apiUrl =
  window.origin === "http://localhost:3000"
    ? "http://localhost:80"
    : "http://ec2-18-197-163-2.eu-central-1.compute.amazonaws.com";

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
    .then(function (res) {
      return res.json();
    })
    .then(function (res) {
      const accessToken = res.accessToken.split(" ")[1];
      startUserSession(accessToken);
    })
    .catch(function (res) {
      console.log(res);
    });
}
function startUserSession(accessToken) {
  localStorage.setItem("token", accessToken);
  window.location.href = "/";
}

main();
