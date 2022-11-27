export function inputListener(className, listenType, inputFunction) {
   const inputs = document.getElementsByClassName(className);
   for (let item of inputs) {
      item.addEventListener(listenType, inputFunction)
   };
}
