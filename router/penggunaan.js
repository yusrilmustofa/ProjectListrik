const express = require('express');
const multer = require('multer');
const app =express()

const penggunaan=require("../models/index").penggunaan
app.use(express.urlencoded({extended:true}))


app.get("/",async (req,res)=>{
  penggunaan.findAll({
    include:["pelanggan"]
  })
  .then(result =>{
    res.json(result)
  })
  .catch(error =>{
    message:error.message
  })
})

app.get("/:id_penggunaan",async (req,res)=>{
  let param ={id_penggunaan:req.params.id_penggunaan}
  penggunaan.findOne({where : param})
  .then(result => {
      res.json(result)
  })
  .catch(error => {
    message: error.message
  })
})

app.post("/register",async (req,res)=>{
  let data ={
    id_pelanggan:req.body.id_pelanggan,
    bulan:req.body.bulan,
    tahun:req.body.tahun,
    meter_awal:req.body.meter_awal,
    meter_akhir:req.body.meter_akhir
  }
  penggunaan.create(data,{
    include:["pelanggan"]
  })
  .then(result =>{
    res.json({
      message: "Data has been Insert",
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
    id_pelanggan:req.body.id_pelanggan,
    bulan:req.body.bulan,
    tahun:req.body.tahun,
    meter_awal:req.body.meter_awal,
    meter_akhir:req.body.meter_akhir
  }
  let parameter ={
    id_penggunaan:req.body.id_penggunaan
  }
  penggunaan.update(data, {where : parameter})
  .then(result =>{
    res.json({
      message:"data has been Update"
    })
  })
  .catch(error =>{
    res.json({
      message:error.message
    })
  })
})

app.delete("/:id_penggunaan",async (req,res)=>{
  //delete Data
  let id_penggunaan =req.params.id_penggunaan

  let param ={
    id_penggunaan:id_penggunaan
  }
  penggunaan.destroy(data,{where : param})
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

module.exports=app
