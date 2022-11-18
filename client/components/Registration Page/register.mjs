function showPasswordFunction() {
    var show = document.getElementById("password1");
    if (show.type === 'password') {
      show.type = 'text';
    } else {
      show.type = "password";
    }
  }
