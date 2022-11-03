/* Use inside component */

import { useButton } from "./button.mjs";

useButton('buttonPrimary', primaryButtonClick);
useButton('buttonGhost', ghostButtonClick);

function primaryButtonClick() {
    console.log('Primary button was clicked!');
}

function ghostButtonClick() {
    console.log('Ghost button was clicked!');
}