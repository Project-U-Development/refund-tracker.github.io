import "../components/datepicker/datepicker.mjs";
import initDatepicker from "../components/datepicker/datepicker.mjs";
import "../components/button/button.mjs";
import "../components/input/input.mjs";
import "../components/selectors/selectors.mjs";
import { formatISO, parse as parseDate } from 'https://unpkg.com/date-fns@2.29.3/esm/index.js';

const form = document.getElementById('createRefundForm');

function changeStringToDate (dateValue) {
    const date = parseDate(dateValue, 'dd-MM-yyyy', new Date());
    
    return formatISO(date, {representation: 'date'});
}

form.oninput = function () {

    const btnActive = document.getElementById('buttonPrimary');
    const formData = new FormData(form);
    const whatRefundValue = formData.get("product_name");
    const whoRefundValue = formData.get("debtor");
    const expectedMoneyValue = formData.get("amount");
    const dueDateValue = formData.get("due_date");

    const dueDate = changeStringToDate(dueDateValue);

    if (whatRefundValue.length > 5 && whoRefundValue.length > 5 && expectedMoneyValue.length > 0
        && dueDate) {
        btnActive.removeAttribute('disabled');
    } else {
        btnActive.setAttribute('disabled', true);
    }
}
initDatepicker();

// for back click button
document.getElementById('buttonGhost').onclick = function () {
    window.location.href = 'redirect-url';
};



function main() {
    const form = document.getElementById("createRefundForm");
    form.onsubmit = function (event) {
        event.preventDefault();
        const data = getRefundData(event.target);
        refund(data);
    };
}


function getRefundData(form) {
    const formData = new FormData(form);
    const body = {
        product_name: formData.get("product_name"),
        debtor: formData.get("debtor"),
        amount: formData.get("amount"),
        due_date: changeStringToDate(formData.get("due_date"))
    };

    if (formData.has("reminder_type")) {
        body.reminder = {
            reminder_type: formData.get("reminder_type"),
            frequency: formData.get("frequency"),
            time_unit: formData.get("time_unit"),
        };
    }
    console.log(formData);
    return body;
}

console.log(window.origin);
const apiUrl =
    window.origin === "http://localhost:3000"
        ? "http://localhost:80"
        : "http://ec2-18-197-163-2.eu-central-1.compute.amazonaws.com";

function refund(data) {
    fetch(`${apiUrl}/refund`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "authorization": `Bearer ${window.localStorage.getItem('token')}`
        },
        body: JSON.stringify(data),
    })
        .then(function (res) {
            window.location = '/';
        })
        .catch(function (res) {
            console.log(res);
        });
}

main();
