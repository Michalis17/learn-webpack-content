var path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mockAPIResponse = require('./mockAPI.js');
const dotenv = require('dotenv');

// load the enviroment variables 
dotenv.config();
// API STUFF
const baseURL = 'https://api.meaningcloud.com/sentiment-2.1';
const apiKEY = process.env.API_KEY;

const app = express()

// Middleware to parse JSON data from the request body
app.use(bodyParser.json());

app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// designates what port the app will listen to for incoming requests
app.listen(3000, function () {
    console.log('Example app listening on port 3000! http://localhost:3000/')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})


//  POST route to handle incoming data
app.post('/analysis', (req, res) => {
  const articleURL = req.body.input; // Data received from the client
  const url = baseURL + '&key=' + apiKEY + '&lang=en' + '?url=' + articleURL;
  // You can process the data here and send a response if needed
  sentimentAnalysis(url)
  .then(data => {
    console.log(data.score_tag);
    console.log(data.subjectivity);// this is where you use res.send 
  })
  .catch(error => {
    console.error('Error:', error);
  });
//   res.send({ message: 'Data received successfully' });
});

const sentimentAnalysis = async (url) => {
  const res = await fetch(url);
  try {
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error", error);
  }
};


