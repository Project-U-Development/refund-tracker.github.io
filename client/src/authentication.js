function main() {
  const token = localStorage.getItem("token");

  if (token && token.length > 0 && window.location.pathname === "/login") {
    window.location.href = "/";
  }
  if ((!token || token.length < 0) && window.location.pathname !== "/login") {
    window.location.href = "/login";
  }
}
main();
