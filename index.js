import axios from 'axios';
import dotenv from 'dotenv';
import express from 'express';
import nunjucks from 'nunjucks';

const app = express()
dotenv.config();
const port = 4000;
const { MICROSERVICE_URL} = process.env

nunjucks.configure('views', {
  autoescape: true,
  express: app
});

app.get('/', (req, res) => {
  axios.get(MICROSERVICE_URL + '/data')  
    .then(response => {
      res.send(`Hello to ${response.data.name}`)
    })
    .catch(error => {
      console.log(error)
      res.send('Error')
    })
})

app.get('/helloworld', (req, res) => {
  res.render('hello.njk', { message: 'Hello, World!'})
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
