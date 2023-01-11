import { inputListener } from "./input.mjs";

inputListener('input', mistakeMessageFunction);

function mistakeMessageFunction() {
   console.log('It is a mistake message...');
}