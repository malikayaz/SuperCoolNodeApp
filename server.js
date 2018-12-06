// server.js
const http           = require('http');
const express        = require('express');
//const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const request        = require('request');
//const db             = require('./config/db');
const app            = express();
var router           = express.Router();

const port = process.env.PORT || 8000;
app.use(bodyParser.urlencoded({ extended: true }));

//require('./app/routes')(app, {});

const server = http.createServer((req, res) => {
    console.log('URL: ' + req.url);
    var url = "https://rbs-gs-seacrh.search.windows.net/indexes/productdview/docs?api-version=2017-11-11&search=*";

    // Set the headers
    var headers = {
      'api-key':       'AA4647D58A4F379592CF82AC9A668A9D',
      'Content-Type':     'application/json'
    }
    // Configure the request
    var options = {
      url: url,
      method: 'GET',
      headers: headers,
      qs: {'api-version': '2017-11-11', 'search': '*'}
    }
    // Start the request
    request(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
          // Print out the response body
          console.log('Here is the response');
          var json = JSON.parse(body);
          //console.log(json);
          res.write(body);
      }
      else{
             console.log(error);
           }
    })
    //res.end('Hello, server!')
});

server.listen(port, () => {
  console.log('We are live on ' + port);
});
