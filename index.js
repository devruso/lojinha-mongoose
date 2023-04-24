require("dotenv").config();
const express = require("express");
const app = express();
const rotaProdutos = require("./routes/produtos");
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URL);


app.use(express.json());
app.use(rotaProdutos);

app.listen(3000, () =>{
    console.log("servidor rodando em http://localhost:3000.");
})