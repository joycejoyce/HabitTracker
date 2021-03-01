const express = require('express');
const path = require('path');
const port = process.env.PORT || 3000;
const app = express();
/*const awsmobile = require("./scripts/src/aws-exports.js");

console.log({awsmobile});
console.log(awsmobile.oauth);

const { NODE_ENV } = process.env;
console.log("NODE_ENV: " + NODE_ENV);
const DEV_URL = "http://localhost:3000/";
const PROD_URL = "https://habit-builder-2.herokuapp.com/";

if (NODE_ENV === "development") {
  awsmobile.oauth.redirectSignIn = DEV_URL;
  awsmobile.oauth.redirectSignOut = DEV_URL;
}
else {
  awsmobile.oauth.redirectSignIn = PROD_URL;
  awsmobile.oauth.redirectSignOut = PROD_URL;
}*/

// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname));

// send the user to index html page inspite of the url
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.listen(port);