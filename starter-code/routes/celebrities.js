const express = require('express')
const router = express.Router()

const Celebrity = require('../models/celebrity')
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/Celebrities')

// helpers to be moved to own module

const listCelebs = (req, res, next) => {
  const allRender = allRenderConstructor(req,res,next)
  Celebrity.find({}, allRender)
} 

const allRenderConstructor = (req,res,next) =>{
  return (err,data) => {
    err ? (() => { next(); return err})()
      : res.render('celebrities/index', { 
        celebs: data, 
        title: 'Here are the Celebs' 
      })
  }
}


const showCeleb = (req, res, next) =>{
  const  oneRender = oneRenderConstructor(req,res,next)
  Celebrity.findById(req.params.id, oneRender)

}

const oneRenderConstructor = (req, res, next) =>{
  return (err,data) => {
    err ? (() => { next(); return err})()
      : res.render('celebrities/show', { 
        celeb: data, 
        title: `This is the celeb called ${data.name}` 
      })
  }
}


//########### Routes

/* GET home page. */

router.get('/', listCelebs)

// ############## Show one Celeb
router.get('/:id', showCeleb)


module.exports = router
