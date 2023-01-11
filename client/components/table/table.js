let row_1 = document.createElement('tr');

let row_1_data_0 = document.createElement('td');
let row_1_data_1 = document.createElement('td');
let row_1_data_2 = document.createElement('td');
let row_1_data_3 = document.createElement('td');
let row_1_data_4 = document.createElement('td');

row_1_data_0.innerHTML = "12.12.2022";
row_1_data_1.innerHTML = "Bag";
row_1_data_2.innerHTML = "Gucci";
row_1_data_3.innerHTML = "100";
row_1_data_4.innerHTML = "20.12.2022";

tbody.appendChild(row_1);
row_1.appendChild(row_1_data_0);
row_1.appendChild(row_1_data_1);
row_1.appendChild(row_1_data_2);
row_1.appendChild(row_1_data_3);
row_1.appendChild(row_1_data_4);


document.getElementById(tbody).appendChild(row_1);



