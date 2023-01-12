/* Exported, publicly available function, use wherever needed in code */

export function useButton(idButton, clickButtonFunction) {
  const button = document.getElementById(idButton);
  button.onclick = clickButtonFunction;
}