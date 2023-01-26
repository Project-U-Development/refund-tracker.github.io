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

const form = document.getElementById('formForInputValueId');
form.oninput = function(){
  const btnActive = document.getElementById('buttonPrimary');
  const formData = new FormData(form);
  const whatRefundValue = formData.get("whatToRefund");
  const whoRefundValue = formData.get("whoRefunds");
  const expectedMoneyValue = formData.get("expectedMoney");
  const dueDateValue = formData.get("dueDate");
  // console.log(emailValue, passwordValue);
  if(whatRefundValue.length > 5 && whoRefundValue.length > 5 ) 
//   && expectedMoneyValue.length > 0  && dueDateValue.length > 0
  {
    console.log("disabledFalse");
     btnActive.removeAttribute('disabled');
  } else {
    //  console.log("disabledTrue");
    btnActive.setAttribute('disabled', true);
  }
}

// for back click button
document.getElementById('buttonGhost').onclick = function() {
    window.location.href = 'redirect-url';
  };