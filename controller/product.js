'use strict'

const Product = require('../models/product')

//Vista
function getproducts(req, res){
	Product.find({},(err,product) => {
		if(err) return res.status(500).send({message: `Error al realizar la petición:${err}`})
		if(!product) return res.status(404).send({message: `El producto no existe`})
		res.status(200).send({product: product})
	})
}
//Vista
function getproduct(req,res){
	let id = req.params.id
	Product.findById(id,(err,product) => {
		if(err) return res.status(500).send({message: `Error al realizar la petición:${err}`})
		if(!product) return res.status(404).send({message: `El producto no existe`})
		res.status(200).send({product: product})
	})
}

//Guardar
function saveproduct(req, res){
	console.log('POST api/product')
	console.log(req.body)

	let product = Product()
	product.name = req.body.name
	product.picture = req.body.picture
	product.price = req.body.price
	product.category = req.body.category
	product.description = req.body.description

	product.save((err,productStored) => {
		if (err) res.status(500).send({message: `Error al Salvar la base de datos: ${err}`})

			res.status(200).send({product: productStored})
	})
}

//Actualizar
function updateproduct(res,req){
	let id = req.params.id
	let update = req.body
	Product.findByIdAndUpdate(id,update, (err, productUpdate) => {
		if(err) res.status(500).send({message: `Error a la hora de eliminar el producto : ${err}`})
		res.status(200).send({product: productUpdate})
	})
}

//Eliminar
function deleteproduct(res,req){
	let id = req.params.id

	Product.findById(id,(err,product) =>{
		if(err) res.status(500).send({message: `Error a la hora de borrar el producto : ${err}`})

		product.remove(err =>{
			if(err) res.status(500).send({message: `Error a la hora de borrar el producto : ${err}`})
				res.status(200).send({message: `El producto ha sido elimimado`})
		})
	})
}

module.exports  = {
	getproducts,
	getproduct,
	saveproduct,
	updateproduct,
	deleteproduct
}
