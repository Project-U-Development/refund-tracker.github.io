export function inputListener(inputs, listenType, inputFunction) {
   for (let item of inputs) {
      item.addEventListener(listenType, inputFunction)
   };
}
