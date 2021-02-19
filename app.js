const dotenv = require('dotenv').config()
const express = require ('express');  // web app framework
const fetch = require('node-fetch');  // library for making requests
const cors = require('cors');         // Cross Origin Resource Sharing

const app	= express();      // enable express
app.use( cors() );          // make express attach CORS headers to responses
app.use( express.json() );  // add json capabilities to our express app

let fetchOptions = {
    headers: {
      'app_key': process.env.OXFORD_KEY,
      'app_id': process.env.OXFORD_ID
    }
}

let oxfordAPI = 'https://od-api.oxforddictionaries.com/api/v2/entries/en-us/'

// Forward requests for words to Oxford API and send back the response
app.get('/OxfordAPI/:word', (req, res) => {
  let word = encodeURIComponent( req.params.word);
  var url = oxfordAPI + word;
  fetch(url, fetchOptions)
    .then(response => response.json())
    .then(result =>  res.send(  result ) )
    .catch(error => console.log('error', error));
});

//Go live
app.listen(0, () => {
  console.log("We are live " );
});
