import { inputListener } from '../input/input.mjs';

inputListener('inputNoLabel', 'input', checkInputValidation);

function checkInputValidation() {
    const input = document.querySelector('#fieldEmail');
    document.querySelector('#buttonEnterEmail').disabled = !input.checkValidity();
}