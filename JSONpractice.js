let objectLiteral = {
	firstName: 'Madeleine',
	isAProgrammer: true
};

let jsToJSON = JSON.stringify(objectLiteral);

console.log(jsToJSON);

let jsonObject = '{ "firstName": "Madeleine", "isAProgrammer": true}';

let jsonToJS = JSON.parse(jsonObject);

console.log(jsonToJS);
