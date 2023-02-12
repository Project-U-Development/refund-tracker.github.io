export default function creatRows(tbody){
	
	let row = document.createElement('tr');
	tbody.appendChild(row);
	let i = 0;
	while (i < 5){
	let cell = document.createElement('td');
	row.appendChild(cell);
	cell.classList.add("table-cell");
	cell.innerHTML = rowId1[i];
	i++;
	}
}