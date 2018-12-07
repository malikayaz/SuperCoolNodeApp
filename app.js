const http           = require('http');
const express        = require('express');
const bodyParser     = require('body-parser');
const request        = require('request');
const app            = express();
//var router           = express.Router();

//app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 3000

const server = http.createServer((req, res) => {
    console.log('URL: ' + req.url);
    var result = '';
    try {
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
            result = 'body'+body;
          if (!error && response.statusCode == 200) {
              // Print out the response body
              console.log('Here is the response');
              result = JSON.stringify(response.body);
              
                var json = JSON.parse(body);
                console.log(result);
                res.end(result);
          }
          else{
                 console.log(error);
                 res.end('$'+error+'$');
               }
        });
    }
    catch(error) {
      console.error(error);
      res.end('!'+error+'!');
      // expected output: SyntaxError: unterminated string literal
      // Note - error messages will vary depending on browser
    }
});

// const server = http.createServer((req, res) => {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/html');
//     res.end('<h1>Hello World</h1>');
// });

server.listen(port,() => {
    console.log(`Server running at port `+port);
});