const express = require('express');
const multer = require('multer');
const app =express()

const tagihan =require("../models/index").tagihan
const penggunaan =require("../models/index").penggunaan
app.use(express.urlencoded({extended:true}))

app.get("/",async (req,res)=>{
  tagihan.findAll({
    include:["penggunaan"]
  })
  .then(result =>{
    res.json(result)
  })
  .catch(error =>{
    message:error.message
  })
})

app.get("/:id_tagihan",async (req,res)=>{
  let param ={id_tagihan:req.params.id_tagihan}
  tagihan.findOne({
    where : param,
    include:["penggunaan"]
  })
  .then(result =>{
    res.json(result)
  })
  .catch(error =>{
    message:error.message
  })
})

app.post("/register",async (req,res)=>{
  let parameter ={
    id_penggunaan:req.body.id_penggunaan
  }
  //mencari file meter awal dan akhir di file sebelah
  let oldpenggunaan = await penggunaan.findOne({where : parameter})
  let data ={
    id_penggunaan:req.body.id_penggunaan,
    bulan:req.body.bulan,
    tahun:req.body.tahun,
    jumlah_meter:oldpenggunaan.meter_akhir - oldpenggunaan.meter_awal,
    status:false
  }
  tagihan.create(data)
  .then(result => {
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
    id_penggunaan:req.body.id_penggunaan,
    bulan:req.body.bulan,
    tahun:req.body.tahun,
    jumlah_meter:req.body.jumlah_meter,
    status:req.body.status
  }
  let parameter ={
    id_tagihan:req.body.id_tagihan
  }
  tagihan.update(data ,{where : parameter})
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

app.delete("/:id_tagihan", async (req,res)=>{
  //delete data
  let id_tagihan = req.params.id_tagihan

  //object
   let param ={
     id_tagihan:id_tagihan
   }
   tagihan.destroy({where : param})
   .then(result => {
       res.json({
           message: "Data has been Destroy"
       })
   })
   .catch(error =>{
     res.json({
       message:error.message
     })
   })
})
module.exports =app
