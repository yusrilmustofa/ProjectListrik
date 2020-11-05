const express = require("express")
const multer = require("multer")
const app = express()

//call models for pelanggan
const pelanggan=require("../models/index").pelanggan
app.use(express.urlencoded({extended:true}))

app.get("/", async (req,res) => {
  //ambil Data
  pelanggan.findAll({
    include:["tarif"]
  })
  .then(result => {
      res.json(result)
  })
  .catch(error => {
    message: error.message
  })
})

app.get("/:id_pelanggan", async (req,res) => {
  //ambil Data
  let param ={id_pelanggan:req.params.id_pelanggan}
  pelanggan.findOne({where:param})
  .then(result => {
      res.json(result)
  })
  .catch(error => {
    message: error.message
  })
})

app.post("/register", async (req,res)=>{
  //insert data
  let data ={
    id_tarif:req.body.id_tarif,
    username:req.body.username,
    password:req.body.password,
    nomor_kwh:req.body.nomor_kwh,
    nama_pelanggan:req.body.nama_pelanggan,
    alamat:req.body.alamat
  }
  //execute Data
  pelanggan.create(data)
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
    username:req.body.username,
    password:req.body.password,
    nomor_kwh:req.body.nomor_kwh,
    nama_pelanggan:req.body.nama_pelanggan,
    alamat:req.body.alamat,
    id_tarif:req.body.id_tarif
  }
  let parameter ={
    id_pelanggan:req.body.id_pelanggan
  }
  pelanggan.update(data,{where:parameter})
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

app.delete("/:id_pelanggan",async (req,res)=>{
  // delete data
  let id_pelanggan = req.params.id_pelanggan // variable

  // object
  let param = {
      id_pelanggan: id_pelanggan
  }
  //execute destroy data
  pelanggan.destroy({where : param})
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

module.exports = app
