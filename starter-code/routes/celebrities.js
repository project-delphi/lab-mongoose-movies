const express = require('express')
const router = express.Router()

const Celebrity = require('../models/celebrity')
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/Celebrities')


const handlerConstructor = (req,res,next) =>{
  return (err,data) => {
    console.log(data);
    err ? (() => { next(); return err})()
      : res.render('celebrities/index', { 
        celebs: data, 
        title: 'Here are the Celebs' 
      })
  }
}


const celebGetHandler = (req, res, next) => {
  const findThenRender = handlerConstructor(req,res,next)
  Celebrity.find({}, findThenRender)
} 

/* GET home page. */
router.get('/', celebGetHandler)

module.exports = router
