const express = require("express");
const app = express();
const path = require("path");
const port = 3060;


app.listen(port, ()=>{
    console.log("servidor corriendo en puerto http://localhost:" + port)
});
app.use(express.static("public"));
app.get("/", (req,res)=> res.sendFile(path.resolve(__dirname, "views", "home.html")));
app.get("/carrito", (req,res)=> res.sendFile(path.resolve(__dirname, "views", "carrito.html")));
app.get("/login", (req,res)=> res.sendFile(path.resolve(__dirname, "views", "login.html")));
app.get("/registro", (req,res)=> res.sendFile(path.resolve(__dirname, "views", "registro.html")));
app.get("/detalleDeProducto", (req,res)=> res.sendFile(path.resolve(__dirname, "views", "detalleDeProducto.html")));