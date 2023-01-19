import { useButton } from "../button/button.mjs";

useButton('buttonPrimary', primaryButtonClick);
useButton('buttonGhost', ghostButtonClick);

function primaryButtonClick() {
    console.log('Primary button was clicked!');
}

function ghostButtonClick() {
    console.log('Ghost button was clicked!');
}

import { inputListener } from "../input/input.mjs";

inputListener('input', mistakeMessageFunction);

function mistakeMessageFunction() {
   console.log('It is a mistake message...');
}

btnActive = document.querySelector('.button');
input = document.querySelector('.input');
btnActive.setAttribute('disabled', true);

input.oninput = function() {
    if (input.value.length < 5) {
        btnActive.setAttribute('disabled', true);
    } else{
        btnActive.removeAttribute('disabled');
    }
}