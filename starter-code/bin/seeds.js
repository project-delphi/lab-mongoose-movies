const celebrity_data = [
  {   name:'Tom Cruise' ,
    occupation: 'Actor',
    catchPhrase: 'Mission Impossible'
  },
  {   name: 'Zara Philips',
    occupation:'Royalty' ,
    catchPhrase:'Horses' 
  },
  {   name:'Dua Lipa' ,
    occupation:'Singer' ,
    catchPhrase: 'I got new rules'
  }
]

const Celeb = require('../models/celebrity.js')
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/Celebrities')

const createHandler = (err,data) => {
  err ? console.log(`There was a problem with ${err}`)
      : console.log(`Document created for ${data.name}`)
  return
}

Celeb.create(celebrity_data, createHandler)

// mongoose.disconnect('mongodb://localhost')