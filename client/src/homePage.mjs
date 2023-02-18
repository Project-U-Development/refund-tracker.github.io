import {  format } from 'https://unpkg.com/date-fns@2.29.3/esm/index.js';



function createTableRow(row, table) {
  let tr = document.createElement("tr");
  let date_due=row.due_date.split('-');
  tr.innerHTML =
    `<td class="table-cell">

					<input class="checkbox checkbox-label" type="checkbox" />
					<span class="checkbox-new"></span>

				<span class="table-data">${format(new Date(row.creation_time),'dd-MM-yyyy')}</span>`+
    `<td class="table-cell table-data">${row.product_name}</td>`+
    `<td class="table-cell table-data">${row.debtor}</td>`+
    `<td class="table-cell table-data">${row.amount$}</td>`+
    `<td class="table-cell table-data">${date_due[2]}-${date_due[1]}-${date_due[0]}</td>`;
  table.appendChild(tr);

}
console.log("Hi");

let token = localStorage.getItem("token");
console.log('-----------------------------', token);
const apiUrl =
  window.origin === "http://localhost:3000"
    ? "http://localhost:80"
    : "http://ec2-18-197-163-2.eu-central-1.compute.amazonaws.com";

async function getRefundList() {
  const response = await fetch(`${apiUrl}/refoundsList`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json", 
      "Authorization": "Bearer " + token
    },
  });
  const json = await response.json();
  console.log(json);
  return json;
}



  const result = await getRefundList();
  const list = document.getElementById('tbody');
  list.replaceChildren(); // removes all children (list items) from list, before adding freshly acquired ones
  console.log(result);
  result.forEach((item) => createTableRow(item, list));


// // --------------POST
// async function postRefund(pName,pDebtor,pAmount,pDueDate) {
//   const response = await fetch('https://oijv97k0l6.execute-api.eu-central-1.amazonaws.com/test/refunds', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       name: pName,
//       debtor: pDebtor,
//       amount: pAmount,
//       dueDate: pDueDate,
//       // currency: 'euro' // optional field, you can pass any currenct name, but you don't have to. By default it's in euro.
//     })

//   });
//   let result = {
//     status: response.status,
//     statusText: response.statusText
//   }
//   return result;
// }

// const form = document.getElementById('detail-form');
// form.onsubmit = async function submit(event) {
//   // Preventing page reload
//   event.preventDefault();
//   // Creating special object, so that we can get input values
//   const formData = new FormData(form);
//   // Getting input values by input names (NOT ids)
//   const name = formData.get('name') || '';
//   const debtor = formData.get('debtor') || '';
//   const amount = formData.get('amount') || '';
//   const dueDate = formData.get('dueDate') || '';

//   let result = await postRefund(name,debtor,amount,dueDate);
//   const resultText = document.getElementById("result");
//   if (result.status === 200) {
//     resultText.innerHTML = 'Refund created!'
//   } else if (result.status >= 400) {
//     resultText.innerHTML = result.statusText;
//   }
// }
