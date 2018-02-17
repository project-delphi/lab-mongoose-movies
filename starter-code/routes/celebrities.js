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


const newCeleb = (req,res,next) => {
  res.render('celebrities/new')
}

const postCeleb = (req,res,next) => {
  const celeb = new Celebrity({
    name:         req.body.name,
    occupation:   req.body.occupation,
    catchPhrase:  req.body.catchPhrase
  })
  celeb.save( (err)=>{ 
    err ? res.render('celebrities/new') 
      : listCelebs(req,res,next)
  })
}

const editCeleb = (req,res,next) => {


}

const deleteCeleb = (req,res,next) => {
    Celebrity.findByIdAndRemove(req.params.id, (err, data)=>{
    err ? (()=>{ next(); return err })()
      : listCelebs(req, res, next)
  })

}

// ################## Routes ###################
// home page
router.get('/', listCelebs)
// Show one Celeb
router.get('/:id', showCeleb)
// create new celeb
router.get('/new', newCeleb)
// post form of new celeb
router.post('/', postCeleb)

router.post('/:id/edit', editCeleb)

router.post('/:id/delete', deleteCeleb)

module.exports = router
