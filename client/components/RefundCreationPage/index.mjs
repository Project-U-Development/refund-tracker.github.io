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