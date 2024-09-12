const express = require('express')
const dbuser = require('./data/login-model.js')
const bcrypt = require('bcryptjs')
const router = express.Router()

router.post('/register', (req, res)=>{
    let user = req.body
    user.password = bcrypt.hashSync(user.password, 10)
    dbuser.register(user)
    .then(saved=>{
      req.session.user = saved;
        res.status(200).json(saved);
    })
    .catch(error=>{
        res.status(500).json(error)
    })
})

router.post('/login', (req, res)=>{
    const { userName, password } = req.body;

    dbuser.findbyuser({ userName })
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        req.session.user= user // create session
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
    // const userName = req.headers.username // I did this since postman was changing caps to small letters 
    // const password  = req.headers.password
    // if (userName && password) {
    //   dbuser.findbyuser({ userName })
    //     .then(user => {
    //       if (user && bcrypt.compareSync(password, user.password)) {
    //         dbuser.findusers().then(users=>{
    //             res.status(200).json(users)})
    //       } else {
    //         res.status(401).json({ message: 'Invalid Credentials' });
    //       }
    //     })
    //     .catch(error => {
    //       res.status(500).json({ message: 'server error' });
    //     });
    // } else {
    //   res.status(400).json({ message: 'No username and/or password provided' });
    // }
  //using session and cookies
  if(req.session && req.session.user){
    dbuser.findusers().then(users=>{
    res.status(200).json(users)})
  }else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }

})

router.get('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        res.json({
          message: "you can checkout but you can't leave"
        });
      } else {
        res.end();
      }
    })
  }
});



module.exports = router