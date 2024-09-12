const express = require('express')
const helmet = require('helmet');
const cors = require('cors');
const router = require('./login_router')
const session = require('express-session')
const connectSessionKnex = require('connect-session-knex')
const knex = require('knex')

const config = require('./knexfile')

const db = knex(config.development)

const server = express()
const KnexSessionStore = connectSessionKnex(session)
const sessionConfig = {
  name: 'trackpad life',
  // THIS SHOULD NOT BE HARD CODED IN
  secret: 'monsoon demons are messing with my gutters',
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure: false,
    httpOnly: true // the cant access via js
  },
  resave: false,
  saveUninitialized: false,
  // where do we store our sessions?
  store: new KnexSessionStore({
    knex: db,
    tablename: 'sessions',
    sidfieldname: 'sid',
    createtable: true,
    clearInterval: 1000 * 60 * 60
  })
}

server.use(helmet())
server.use(express.json())
server.use(cors())
server.use(session(sessionConfig))
server.use('/api/users', router)
server.get('/',(req, res)=>{
    res.send('Hellow this is user login & signup API')
})

module.exports = server
