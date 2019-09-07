const express = require('express')

const router = require('./login_router')

const server = express()

server.use(express.json())

server.use('/api/users', router)

server.get('/',(req, res)=>{
    res.send('Hellow this is user login & signup API')
})

module.exports = server
