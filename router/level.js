const express = require('express');
const multer = require('multer');
const app = express()

const level=require("../models/index").level
app.use(express.urlencoded({extended:true}))

app.get("/",async (req,res)=>{
  level.findAll()
  .then(result => {
      res.json(result)
  })
  .catch(error => {
    message: error.message
  })
})

app.get("/:id_level",async (req,res)=>{
  let param={id_level:req.params.id_level}
  level.findOne({where : param})
  .then(result)
  .catch()
})
app.post("/register",async (req,res)=>{
  let data ={
    nama_level:req.body.nama_level
  }
  level.create(data)
  .then(result => {
      res.json({
          message: "Data has been inserted",
          data: result
      })
  })
  .catch(error =>{
    res.json({
      message:error.message
    })
  })
})

app.put("/",async (req,res)=>{
  let data ={
    nama_level:req.body.nama_level
  }
  let parameter={
    id_level:req.body.id_level
  }
  level.update(data,{where:parameter})
  .then(result => {
      res.json({
          message: "Data has been updated",
          data: result
      })
  })
  .catch(error => {
      res.json({
          message: error.message
      })
  })
})

app.delete("/:id_level",async (req,res)=>{
  // delete data
  let id_level = req.params.id_level // variable

  // object
  let parameter = {
      id_level: id_level
  }
 level.destroy({where : parameter})
  .then(result => {
      res.json({
          message: "Data has been destroyed",
          data: result
      })
  })
  .catch(error => {
      res.json({
          message: error.message
      })
  })
})
module.exports =app
