/* Exported, publicly available function, use wherever needed in code */

export function useButton() {
  const button = document.getElementById('buttonPrimary');
  button.onclick = () => console.log('clicked');
}