const express = require('express')
const server = express()
server.use(express.json())
server.get('/',(req, res)=>{
    res.send('Hellow this is user login & signup API')
})

module.exports = server