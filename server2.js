const express = require("express");

const app = express();
const bodyParser = require('body-parser');

const port = 9000;

app.use(bodyParser.urlencoded({ extended: true })); //need this for regular form elements
app.use(bodyParser.json());

app.use(express.static(__dirname + "/src/practice")); //use static files in ROOT/src/practice folder

app.post("/forms", (request, response) => { //root dir
	console.log('Form received!!!');
	// console.log('request: ', request);
  console.log('request.body: ', request.body);

  response.send("Form Received!!!");
});
console.log('listening on port ', port);
app.listen(port);
