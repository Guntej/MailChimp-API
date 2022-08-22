//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
//Requiring express and body parser and initializing the constant "app"
const app = express();
const port = 3000;
//The public folder which holds the CSS and image
app.use(express.static("public"));
//Using body-parser
app.use(bodyParser.urlencoded({
  entended: true
}));
//Sending the signup.html file to the browser as soon as a request is made on localhost:3000
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

//Creating an object with the users data
app.post("/", function(req, res) {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;
//Uploading the data to the server
  const data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }]
  };

  app.post("/failure", function(req, res){
    res.redirect("/");
  });

  const jsonData = JSON.stringify(data);
  const url = "https://us14.api.mailchimp.com/3.0/lists/9f1b0cc126";

  const options = {
    method: "POST",
    auth: "guntej:7647f956fbca1c07d042706a6bfea3ec-us14"
  };

  const request = https.request(url, options, function(response) {
    response.on("data", function(data) {
      //console.log(JSON.parse(data));
      if (response.statusCode === 200) {
        res.sendFile(__dirname + "/success.html");
      } else {
        res.sendFile(__dirname + "/failure.html");
      }
    });
  });

  request.write(jsonData);

  request.end();


});

//Listening on port 3000 and if it goes well then logging a message saying that the server is running
app.listen(process.env.PORT || port, function() {
  console.log("App is listening on port 3000");
});


// API KEY
// 7647f956fbca1c07d042706a6bfea3ec-us14

// LIST ID
// 9f1b0cc126
