import  "../datepicker/datepicker.mjs";
import initDatepicker from  "../datepicker/datepicker.mjs";
import  "../button/button.mjs";
import  "../input/input.mjs";
import  "../selectors/selectors.mjs";
// import {  isValid } from 'https://unpkg.com/date-fns@2.29.3/esm/index.js';

const form = document.getElementById('formForInputValueId');
form.oninput = function(){
   
  const btnActive = document.getElementById('buttonPrimary');
  const formData = new FormData(form);
  const whatRefundValue = formData.get("whatToRefund");
  const whoRefundValue = formData.get("whoRefunds");
  const expectedMoneyValue = formData.get("expectedMoney");
  const dueDateValue = formData.get("Duedate");

  const parsedDateValues = dueDateValue ? dueDateValue.split('-') : '';
  const year = parsedDateValues[2];
  const month = parsedDateValues[1];
  const day = parsedDateValues[0];
  const dueDate = new Date(year, month, day);


  if(whatRefundValue.length > 5 && whoRefundValue.length > 5 && expectedMoneyValue.length > 0
    && dueDate )
  {
     btnActive.removeAttribute('disabled');
  } else {
     btnActive.setAttribute('disabled', true);
  }
}
initDatepicker();

// for back click button
document.getElementById('buttonGhost').onclick = function() {
    window.location.href = 'redirect-url';
  };

  