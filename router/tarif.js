const express = require("express")
const multer = require("multer")
const app = express()

//call models for pelanggan
const tarif=require("../models/index").tarif
app.use(express.urlencoded({extended:true}))

app.get("/", async (req,res)=>{
  tarif.findAll()
  .then(result => {
      res.json(result)
  })
  .catch(error => {
    message: error.message
  })
})

app.get("/:id_tarif",async (req,res)=>{
  let param ={id_tarif:req.param.id_tarif}
  tarif.findOne({where:param})
  .then(result => {
      res.json(result)
  })
  .catch(error => {
    message: error.message
  })
})

app.post("/register", async (req,res)=>{
  let data ={
    daya:req.body.daya,
    tarifperKwh:req.body.tarifperKwh
  }
  tarif.create(data)
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
    daya:req.body.daya,
    tarifperKwh:req.body.tarifperKwh
  }
  let parameter ={
    id_tarif:req.body.id_tarif
  }
  .then(result => {
      res.json({
          message: "Data has been Updated",
          data: result
      })
  })
  .catch(error =>{
    res.json({
      message:error.message
    })
  })
})

app.delete("/:id_tarif",async (req,res)=>{
  // delete data
  let id_tarif = req.params.id_tarif // variable

  // object
  let param = {
      id_tarif: id_tarif
  }

  tarif.destroy({where:param})
  .then(result => {
      res.json({
          message: "Data has been destroyed",
          data: result
      })
  })
  .catch(error =>{
    res.json({
      message:error.message
    })
  })
})
module.exports = app
