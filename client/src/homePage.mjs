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

let token = localStorage.getItem("token");
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
  return json;
}



  const result = await getRefundList();
  const list = document.getElementById('tbody');
  list.replaceChildren(); // removes all children (list items) from list, before adding freshly acquired ones
  result.forEach((item) => createTableRow(item, list));



