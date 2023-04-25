const {Router} = require("express");
const Produto = require("../models/produto");
const productSchema = require("../productSchema");

const router = Router();

router.get("/produtos", async (req,res) =>{
    const produtos = await Produto.find();
    res.json(produtos);
});

router.post("/produtos", async (req,res) =>{
try{
    const validateSchema = await productSchema.validateAsync(req.body);
    if(validateSchema){
        const newProduto = new Produto({nome: validateSchema.nome, descricao: validateSchema.descricao, quantidade: validateSchema.quantidade,preco:validateSchema.preco, desconto:validateSchema.desconto, dataDesconto:validateSchema.dataDesconto, categoria:validateSchema.categoria});
        await newProduto.save();
        if(newProduto){
        res.status(201).json({message: "Produto adicionado"});
    }else{
        res.status(400).json({message:"Dados inválidos"})
    }
}
}catch(err){
    console.log(err);
    res.status(500).json({message:"Um erro ocorreu"});
}
});

router.put("/produtos/:id", async (req,res) =>{
    const {id} = req.params;
    try{
        const validateSchema = await productSchema.validateAsync(req.body);
        if(validateSchema){
            const attProduto = await Produto.findByIdAndUpdate(id,{nome:validateSchema.nome, descricao:validateSchema.descricao, quantidade:validateSchema.quantidade,preco:validateSchema.preco, desconto:validateSchema.desconto, dataDesconto:validateSchema.dataDesconto, categoria:validateSchema.categoria});
            if(attProduto){
            res.json({message:"Produto atualizado"});
         }
        }else{
            res.status(400).json({message:`Informacoes inválidas: ${validateSchema.error}`});
        }
    }catch(err){
            console.log(err);
            res.status(500).json({message:`Um erro ocorreu: ${err.message}`}); 
         
    }
});

router.delete("/produtos/:id", async (req,res)=>{
    try{
        const {id} = req.params;
        const produtoExistente = await Produto.findByIdAndRemove(id);

        const produtosRestantes = await Produto.find();

        if (produtoExistente){
            res.json({message: "Produto excluído", produtosRestantes});
        } else {
            res.status(404).json({message: "Produto não encontrado"});
        }
    } catch(err) {
        console.log(err);
        res.status(500).json({message: "Um erro aconteceu."});
    }
});

module.exports = router;
