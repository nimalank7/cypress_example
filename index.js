require('dotenv').config()
const express = require('express')
const app = express()
const axios = require('axios')
const port = 4000;
const { MICROSERVICE_URL} = process.env

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

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
