require("dotenv").config();
const express = require("express");
const app = express();
const rotaProdutos = require("./routes/produtos");
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URL);

const swaggerUi = require("swagger-ui-express");
const swaggerJson = require("./swagger.json");

app.use(express.json());
app.use(rotaProdutos);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJson));




app.listen(3000, () =>{
    console.log("servidor rodando em http://localhost:3000.");
})