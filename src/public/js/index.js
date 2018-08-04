//make search bar save value and print it to the screen somewhere

let table = document.getElementById('tableId');
let showElem = document.getElementById('showElem');
let tableColumns = document.querySelectorAll('td');
for(let column of tableColumns) {
	column.addEventListener('click', click, false);
}
let clearButton = document.getElementById('clearButton');
clearButton.addEventListener('click', clear, false);

let searchInput = document.getElementById('testInputBox');
searchInput.addEventListener('input', event => {
	console.log(event.target.value);
	let inputContainer = document.getElementById('testInput');
	inputContainer.innerHTML = '<div>' + event.target.value + '</div>';
	// inputContainer.style.border = '2px solid black'
	inputContainer.className = 'testInputClass';
}, false);


function click(e) {
	let target = e.target;
	let newDiv = '<div>' + e.target.textContent + '</div>';
	showElem.innerHTML = newDiv;
	console.log(target);

}

function clear() {
	let newDiv = '<div></div>';
	showElem.innerHTML = newDiv;
}
