import { useButton } from "../button/button.mjs";

useButton("LogOutBtn", LogOutClickBtn);

function LogOutClickBtn() {
  localStorage.removeItem("token");
  window.location.href = "/login";
}
 