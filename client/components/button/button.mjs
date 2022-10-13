/* Exported, publicly available function, use wherever needed in code */

export function useButton() {
  const button = document.getElementById('button');
  button.onclick = () => console.log('clicked');
}
