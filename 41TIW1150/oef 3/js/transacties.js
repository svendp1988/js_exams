/*
	In this exercise it is not allowed to us .innerHTML or .innerText.

    When a value is selected from the select-box you dynamically create an HTML-table.
    The data in that table is filtered, based upon the chosen value from the select-box.

    Layout of the table:
    	- numeric values are aligned to the right.
    	- negative transactions are given a red background-color. For this a class "rood" has been provided in the
    	.css file.

    In this exercise I left the .html mostly in dutch, because it would take up a lot of time, that i'd rather spend
    making exercises.
 */
const url = "http://localhost:3000/transacties";

const handleLoad = () => {
	document.getElementById("transaction").addEventListener("change", handleChange);
}

const handleChange = () => {
	let select = document.getElementById("transaction");
	let selectedValue = select[select.selectedIndex].value;
	fetch(`${url}?Mutatiesoort=${selectedValue}`)
		.then(response => {
			if (response.status == 200) {
				return response.json();
			}
			throw `Error with status ${response.status}`;
		})
		.then(transactions => {
			generateTable(transactions);
		})
		.catch(error => console.log(error));
}

function generateTable(transactions) {
	let output = document.getElementById("output");
	clearElement(output);
	let table = document.createElement("table");
	let first = true;
	for (let transaction of transactions) {
		if (first) {
			let tr = makeTableRow(transaction, first);
			table.append(tr);
			first = false;
		}
		let tr = makeTableRow(transaction);
		table.append(tr);
	}
	output.appendChild(table);
}

function makeTableRow(object, header = false) {
	let tr = document.createElement("tr");
	let keys = Object.keys(object);
	for (let key of keys) {
		let type = "td";
		let value = object[key];
		if (header) {
			type = "th";
			value = key;
		}
		let td = document.createElement(type);
		if (Number.isInteger(value)) {
			td.style.textAlign = "right";
			if (value < 0) {
				td.setAttribute("class", "rood");
			}
		}
		td.appendChild(document.createTextNode(value));
		tr.appendChild(td);
	}
	return tr;
}

function clearElement(element) {
	while (element.hasChildNodes()) {
		element.remove(element.firstChild);
	}
}

window.addEventListener("load", handleLoad);