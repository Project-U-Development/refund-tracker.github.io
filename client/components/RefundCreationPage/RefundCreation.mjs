import  "../datepicker/datepicker.mjs";
import  "../button/button.mjs";
import  "../input/input.mjs";
import  "../selectors/selectors.mjs";

const form = document.getElementById('formForInputValueId');
form.oninput = function(){
  const btnActive = document.getElementById('buttonPrimary');
  const formData = new FormData(form);
  const whatRefundValue = formData.get("whatToRefund");
  const whoRefundValue = formData.get("whoRefunds");
  const expectedMoneyValue = formData.get("expectedMoney");
  const dueDateValue = formData.get("dueDate");
  
  if(whatRefundValue.length > 5 && whoRefundValue.length > 5 && expectedMoneyValue.length > 0 ) 
//    && isValid(dueDateValue)
  {
     btnActive.removeAttribute('disabled');
  } else {
     btnActive.setAttribute('disabled', true);
  }
}

// for back click button
document.getElementById('buttonGhost').onclick = function() {
    window.location.href = 'redirect-url';
  };

  