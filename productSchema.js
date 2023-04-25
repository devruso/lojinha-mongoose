const Joi = require("joi");

const productSchema = Joi.object({
    nome:Joi.string().min(3).max(130).required().error(new Error("O nome deve ter entre 3 a 130 caracteres")),
    descricao:Joi.string().min(30).max(500).required().error(new Error("A descricao deve ter entre 30 a 500 caracteres")),
    quantidade:Joi.number().integer().required().error(new Error("A quantidade deve ser um inteiro")),
    preco:Joi.number().required().error(new Error("O preco é necessário")),
    desconto:Joi.boolean().required().error(new Error("O desconto é verdadeiro ou falso e é necessário")),
    dataDesconto:Joi.date().required().error(new Error("A data do desconto é necessária")),
    categoria:Joi.string().required().error(new Error("A categoria é uma string e é necessária"))
});

module.exports = productSchema;