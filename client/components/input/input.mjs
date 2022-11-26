// disable/enable button after validation of all inputs on page 
export function checkInputValidation(inputsList, disabledButton) {
  let validate = true;
  for (let item of inputsList) {
     if (!item.checkValidity()) {
        validate = false;
     }
  }
  disabledButton.disabled = !validate;
};

// Mistake validation message function//

// One function variant
document.querySelectorAll('.input-container input').forEach(element => {
	element.addEventListener('input', event => {
      event.target
        .closest('.input-container')
        .querySelector('.helpMistakeMessage')
        .style.display = event.target.checkValidity() ? 'none' : 'block';
      event.target
      .closest('.input-container')
      .querySelector('.mistakeMessage')
        .style.position = event.target.checkValidity() ? 'absolute' : 'relative';
  });
});