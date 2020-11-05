const express = require('express');
const multer = require('multer');
const path = require("path")
const fs =require("fs")
const storage =multer.diskStorage({
  destination:(req,file,cb) =>{
    cb(null, "./cover")
  },
  filename: (req,file, cb) =>{
    cb(null, "cover-" + Date.now() + path.extname(file.originalname))
  }
})
const upload =multer({storage:storage})
const app =express()
const moment =require("moment")

//authorization

const pembayaran=require("../models/index").pembayaran
const tagihan=require("../models/index").tagihan
const tarif=require("../models/index").tarif
app.use(express.urlencoded({extended: true}))

app.get("/",async (req,res)=>{
  pembayaran.findAll({
    include:["tagihan","admin"]
  })
  .then(result =>{
    res.json(result)
  })
  .catch(error =>{
    message:error.message
  })
})

app.get("/:id_pembayaran",async (req,res)=>{
  let param={id_pembayaran:req.params.id_pembayaran}
  pembayaran.findOne({where : param})
  .then(result =>{
    res.json(result)
  })
  .catch(error =>{
    message:error.message
  })
})

app.post("/register", upload.single("cover") ,async (req,res)=>{
  let parameter ={
    id_tagihan:req.body.id_tagihan
  }
  let param={
    id_tarif:req.body.id_tarif
  }
  let oldtagihan =await tagihan.findOne({where : parameter})
  let oldtarif =await tarif.findOne({where : param})
  let data ={
    id_tagihan:req.body.id_tagihan,
    tanggal_pembayaran: moment().format('YYYY-MM-DD HH:mm:ss'), //get Current time
    bulan_bayar:req.body.bulan_bayar,
    biaya_admin:req.body.biaya_admin,
    total_bayar:oldtagihan.jumlah_meter * oldtarif.tarifperKwh,
    status:false,
    bukti:req.body.bukti,
    id_admin:req.body.id_admin,
    id_tarif:req.body.id_tarif
  }
  pembayaran.create(data)
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
  let parameter ={
    id_tagihan:req.body.id_tagihan
  }
  let param={
    id_tarif:req.body.id_tarif
  }
  let oldtagihan =await tagihan.findOne({where : parameter})
  let oldtarif =await tarif.findOne({where : param})
  let data ={
    id_tagihan:req.body.id_tagihan,
    tanggal_pembayaran:moment().format('YYYY-MM-DD HH:mm:ss'), //get Current time
    bulan_bayar:req.body.bulan_bayar,
    biaya_admin:req.body.biaya_admin,
    total_bayar:oldtagihan.jumlah_meter * oldtarif.tarifperKwh,
    status:req.body.status,
    id_admin:req.body.id_admin,
    id_tarif:req.body.id_tarif
  }
  let params ={
    id_pembayaran:req.body.id_pembayaran
  }
  if (req.file) {
    let oldpembayaran = await pembayaran.findOne({where : params})
    let oldCover = oldpembayaran.cover

    //delete old file
    // delete old file
        let pathFile = path.join(__dirname,"../cover",oldCover)
        // __dirname = path direktori pada file saat ini
        fs.unlink(pathFile, error => console.log(error))
        // unlink = hapus file

        data.cover = req.file.filename
  }
  pembayaran.update(data, {where : parameter})
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

app.delete("/:id_pembayaran",async (req,res)=>{
  let id_pembayaran=req.params.id_pembayaran
  let param ={
    id_pembayaran:id_pembayaran
  }
  pembayaran.destroy({where : param})
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
module.exports = app
