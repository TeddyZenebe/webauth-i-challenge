const express = require('express')
const dbuser = require('./data/login-model.js')
const bcrypt = require('bcryptjs')
const router = express.Router()

router.post('/register', (req, res)=>{
    const user = req.body
    user.password = bcrypt.hashSync(user.password, 10)
    dbuser.register(user)
    .then(user=>{
        res.status(200).json(user)
    })
    .catch(error=>{
        res.status(500).json({message: 'server errors'})
    })
})

router.post('/login', (req, res)=>{
    const { userName, password } = req.body;

    dbuser.findbyuser({ userName })
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        res.status(200).json({
          message: `Welcome Mr/mss ${user.userName}!`,
        });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
})

router.get('/', (req, res)=>{
    const userName = req.headers.username // I did this since postman was changing caps to small letters 
    const password  = req.headers.password
    if (userName && password) {
      dbuser.findbyuser({ userName })
        .then(user => {
          if (user && bcrypt.compareSync(password, user.password)) {
            dbuser.findusers().then(users=>{
                res.status(200).json(users)})
          } else {
            res.status(401).json({ message: 'Invalid Credentials' });
          }
        })
        .catch(error => {
          res.status(500).json({ message: 'server error' });
        });
    } else {
      res.status(400).json({ message: 'No username and/or password provided' });
    }
})


module.exports = router