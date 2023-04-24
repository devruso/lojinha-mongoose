const {Router} = require("express");
const Produto = require("../models/produto");


const router = Router();

router.get("/produtos", async (req,res) =>{
    const produtos = await Produto.find();
    res.json(produtos);
})

router.post("/produtos", async (req,res) =>{
try{
    const {nome, descricao, quantidade,preco, desconto, dataDesconto, categoria} = req.body;
    const newProduto = new Produto({nome, descricao, quantidade,preco, desconto, dataDesconto, categoria});
    await newProduto.save();
    if(newProduto){
        res.status(201).json({message: "Produto adicionado"});
    }else{
        res.status(400).json({message:"Dados inválidos"})
    }
}catch(err){
    console.log(err);
    res.status(500).json({message:"Um erro ocorreu"});  
}
})

module.exports = router;