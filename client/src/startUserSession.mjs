export function startUserSession(accessToken) {
   localStorage.setItem("token", accessToken);
   window.location.href = "/";
}