const express = require("express")
const multer = require("multer")
const app = express()

//call models for pelanggan
const admin=require("../models/index").admin
app.use(express.urlencoded({extended:true}))

//authorization

app.get("/", async (req,res) => {
  //ambil Data
  admin.findAll({
    include:["level"]
  })
  .then(result => {
      res.json(result)
  })
  .catch(error => {
    message: error.message
  })
})
app.get("/:id_admin", async (req,res)=>{
  let param ={id_admin:req.params.id_admin}
  admin.findOne({where: param})
  .then(result => {
      res.json(result)
  })
  .catch(error => {
    message: error.message
  })
})

app.post("/register",async (req,res)=>{
  let data ={
    username:req.body.username,
    password:req.body.password,
    nama_admin:req.body.nama_admin,
    id_level:req.body.id_level
  }
  admin.create(data)
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
    id_level:req.body.id_level,
    username:req.body.username,
    password:req.body.password,
    nama_admin:req.body.nama_admin,
  }
  let parameter ={
    id_admin:req.body.id_admin
  }
  admin.update(data,{where : parameter})
  .then(result =>{
    res.json({
      message: "Data has been Update"
    })
  })
  .catch(error =>{
    res.json({
      message:error.message
    })
  })
})

app.delete("/:id_level",async (req,res)=>{
  // delete data
  let id_level = req.params.id_level // variable

  // object
  let param = {
      id_level: id_level
  }
  admin.destroy({where:param})
  .then(result => {
      res.json({
          message: "Data has been destroyed"
      })
  })
  .catch(error => {
      res.json({
          message: error.message
      })
  })
})
module.exports= app
