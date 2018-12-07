const http           = require('http');
const express        = require('express');
const bodyParser     = require('body-parser');
const request        = require('request');
const app            = express();
var router           = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 3000

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

// const server = http.createServer((req, res) => {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/html');
//     res.end('<h1>Hello World</h1>');
// });

server.listen(port,() => {
    console.log(`Server running at port `+port);
});