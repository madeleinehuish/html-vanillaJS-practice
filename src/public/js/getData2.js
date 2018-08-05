
const dataOutputButton = document.getElementById('dataOutputButton');
const dataOutputButtonTable = document.getElementById('dataOutputButtonTable');
const dataOutputDiv = document.getElementById('dataOutput');
const dataPostButton = document.getElementById('dataPost');

let toggle = true;
let toggle2 = true;

dataOutputButton.addEventListener('click', function() {
	if(toggle) {
		getData('list');
		toggle = !toggle;
	} else {
		resetData();
		toggle = !toggle;
	}
}, false);

dataOutputButtonTable.addEventListener('click', function() {
	if(toggle2) {
		getData('table');
		toggle2 = !toggle2;
	} else {
		resetData();
		toggle2 = !toggle2;
	}
}, false);

dataPostButton.addEventListener('click', function() {
	postData();
}, false);


// let data = [];

function getData(outputType) {
	let xhr = new XMLHttpRequest();
	xhr.onload = () => {
		if(xhr.status===200) {
			jsonResponse = JSON.parse(xhr.responseText);
			console.log('json response: ', jsonResponse);
			if(outputType==='list') {
				dataToList(jsonResponse);
			} else if(outputType==='table') {
				dataToTable(jsonResponse);
			}
		}

	}
	xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts', true);
	xhr.send(null);
}

function dataToList(data) {
	resetData();
	let dataUL = document.createElement('ul');
	dataUL.id = 'dataUL';
	// let dataUL = document.createElement('<ul id="dataUL"></ul>');
	let dataList = ''
	for(let elem of data) {
		dataList += `<li>id: ${elem.id}, userId: ${elem.userId}, title: ${elem.title}</li></br>`
	}
	dataUL.innerHTML = dataList;
	dataOutputDiv.appendChild(dataUL);
}

function dataToTable(data) {
	resetData();
	let table = document.createElement('table');
	table.id = 'dataTable';
	let thead = document.createElement('thead');
	thead.innerHTML = `<tr>
												<th>id</th>
												<th>userId</th>
												<th>title</th>
										 </tr>`;
	let tbody = document.createElement('tbody');
	table.appendChild(thead);
	table.appendChild(tbody);

	let dataList = '';
	for(let elem of data) {
		dataList += `<tr>
										<td>${elem.id}</td>
										<td>${elem.userId}</td>
										<td>${elem.title}</td>
								 </tr>`
	}
	tbody.innerHTML = dataList;
	dataOutputDiv.appendChild(table)
}

function resetData() {
	dataOutputDiv.innerHTML = '';
}

//this example posts data as json through XMLHttpRequest
function postData() {
	let xhr = new XMLHttpRequest();
	let url = 'forms';
	let dataObject = { name:"Madeleine", time:"2pm" };
	xhr.open('POST', url, true);
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.onreadystatechange = () => {
    if(xhr.readyState == 4 && xhr.status == 200) {
        console.log('response from server: ',xhr.responseText);
				alert(xhr.responseText);
    }
	}
	xhr.send(JSON.stringify(dataObject));
}

// //this example posts data through fetch
// //there is one problem: response data from server is not coming back...
// function postData() {
// 	let url = '../forms';
// 	let dataObject = { name:"Madeleine", time:"2pm" };
//
// 	fetch(url, {
// 		method: 'POST', // or 'PUT'
// 		body: JSON.stringify(dataObject), //data here can be a string or object
// 		headers: {
// 			'Content-Type': 'application/json'
// 		}
// 	})
// 	.then(res => {
// 		console.log('res.json(): ', res.json())
// 		return res.json();
// 	})
// 	.catch(error => console.error('Error:', error))
// 	.then(response => console.log('Success:', response));
// }

// //this example sends data as params
// function postData() {
// 	let xhr = new XMLHttpRequest();
// 	let url = '/form';
// 	let params = 'orem=ipsum&name=binny';
// 	xhr.open('POST', url, true);
// 	xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
// 	xhr.onreadystatechange = () => {
//     if(xhr.readyState == 4 && xhr.status == 200) {
//         alert(xhr.responseText);
//     }
// 	}
// 	xhr.send(params);
// }


//do this also with the get trucks API

//figure out event prevent default

//differences between content types

//research jquery ajax method also
