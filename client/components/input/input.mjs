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