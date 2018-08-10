const port = 8000;
const express = require("express");

const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true })); //need this for regular form elements
app.use(bodyParser.json());

app.use(express.static(__dirname + "/src/public")); //use static files in ROOT/src folder

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   res.header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
//   next();
// });

app.post("/forms", (request, response) => { //root dir
	console.log('Form received!!!');
	// console.log('request: ', request);
  console.log('request.body: ', request.body);

  response.send("Form Received!!!");
});
console.log('listening on port ', port);
app.listen(port);
