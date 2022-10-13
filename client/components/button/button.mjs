/* Exported, publicly available function, use wherever needed in code */

export function useButton(id) {
  const button = document.getElementById(id);
  button.onclick = () => console.log('clicked');
}
