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

// btnActive = document.querySelector('.button');
// input = document.querySelector('.input');
// btnActive.setAttribute('disabled', true);

// input.oninput = function() {
//     if (input.value.length < 5) {
//         btnActive.setAttribute('disabled', true);
//     } else{
//         btnActive.removeAttribute('disabled');
//     }
// }

function inputButton()
            {
                let textInput1 = document.getElementById('text1').value;
                let textInput2 = document.getElementById('text2').value;
                let numberInput1 = document.getElementById('number1').value;
                let numberInput2 = document.getElementById('number2').value;
                if (textInput1  && numberInput1 && textInput2 && numberInput2) 
                   
                {                
                    document.getElementById('buttonPrimary').disabled = false;
                } else {
                    document.getElementById('buttonPrimary').disabled = true;
                }
            }
inputButton();
document.getElementById('buttonGhost').onclick = function() {
    window.location.href = 'redirect-url';
  };