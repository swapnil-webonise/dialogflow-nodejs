const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello World!'));

app.post('/webhook', (req, res) => {

  if (!req.body) {
    return res.jsonp({ msg: 'Invalid Parameters', status: 444, });
  }

  res.setHeader('Content-Type', 'application/json');
  console.log(req.body);
  var city = req.body.queryResult.parameters['geo-city'];
  let response = "This is a sample response from your webhook!" + city;
  console.log(city);

  var responseObj = {
    "fulfillmentText": response,
    "fulfillmentMessages":[
       {
           "text": {
               "text": [
                   "Hello from " + city
               ]
           }
       }
   ],
   "source":""
  };

  console.log(responseObj);
  return res.json(responseObj);
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));