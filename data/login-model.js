const knex = require('knex')

const config = require('../knexfile.js')

const db = knex(config.development)

module.exports = {
    findusers,
    findbyuser,
    register
  };

  function findusers(){
      return db('users')
  }

  function findbyuser(user){
      return db('users').where(user).first()
  }

  function register(user){
      return db('users').insert(user).then(ids=>{
          const id = ids[0]
          return db('users').where({id}).first();
      })
  }