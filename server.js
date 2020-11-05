const express = require("express")
const app = express()

//call router
let pelanggan =require("./router/pelanggan")
let tarif =require("./router/tarif")
let admin =require("./router/admin")
let level =require("./router/level")
let penggunaan=require("./router/penggunaan")
let tagihan=require("./router/tagihan")
let pembayaran=require("./router/pembayaran")

app.use("/pelanggan", pelanggan)
app.use("/tarif",tarif)
app.use("/admin",admin)
app.use("/level",level)
app.use("/penggunaan",penggunaan)
app.use("/tagihan",tagihan)
app.use("/pembayaran",pembayaran)
app.listen(8000, () => {
    console.log(`Server run on port 8000`);
    console.log("Yok bisa yok jangan menyerah:)");
})
