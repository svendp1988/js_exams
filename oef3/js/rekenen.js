/*
	For this exercise it is not allowed to use .innerHTML.
	It is not allowed to change anything in the rekenen.HTML file.

	When the button_start_calculations is clicked:
		- if the input is not a number a text is displayed that tells you you've entered an incorrect input.
		- if the input is a number the given number of calculations are generated. Every calculations consists
		of the multiplication of two randomly generated numbers between 0 and 9 (both inclusive).

	To every generated input a keyUp-eventListener is attached. When on a keyUp-event the content of the inputfield
	no longer consist of only numbers the contents are displayed in red.
 */


window.addEventListener("load", handleLoad);

function handleLoad () {
	let button_start_calculations = document.getElementById("button_start_calculations");
	button_start_calculations.addEventListener("click",handleClick );
}


function handleClick () {
	let input = document.getElementById("input_number").value;
	let output = document.getElementById("multiplications");
	output.textContent = "";
	if( ! /^\d+$/.test(input) ) {
		output.appendChild(document.createTextNode("Wrong input for number."));
		return;
	}
	generateCalculations(input, output);
}

function handleKeyupInput(event){
	if( ! /^\d+$/.test(event.target.value) ) {
		event.target.style.color = "red";
	} else {
		event.target.style.color = "black";
	}
}

function generateCalculations(number, output) {
	for (let i = 0; i < number; i++) {
		let number1 = parseInt(10 * Math.random());
		let number2 = parseInt(10 * Math.random());
		let div = document.createElement("div");
		let span = document.createElement("span");
		span.textContent = `${number1} * ${number2} = `
		div.appendChild(span);
		let inputBox = document.createElement("input");
		inputBox.setAttribute("type", "text");
		inputBox.addEventListener("keyup", handleKeyupInput);
		div.appendChild(inputBox);
		output.appendChild(div);
	}
}


