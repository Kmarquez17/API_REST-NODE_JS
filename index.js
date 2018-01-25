'use strict'

const express = require('express')
const bodyparser = require('body-parser')
const mongoose = require('mongoose')
const Product = require('./models/product')


const app = express()
const port = process.env.PORT || 2000

app.use(bodyparser.urlencoded({ extended: false}))
app.use(bodyparser.json())

app.get('/api/product',(req, res) => {
	Product.find({},(err,product) => {
		if(err) return res.status(500).send({message: `Error al realizar la petición:${err}`})
		if(!product) return res.status(404).send({message: `El producto no existe`})	
		res.status(200).send({product: product})
	})
})

//Get sirve como consulta
app.get('/api/product/:id',(req, res) =>{
	let id = req.params.id
	Product.findById(id,(err,product) => {
		if(err) return res.status(500).send({message: `Error al realizar la petición:${err}`})
		if(!product) return res.status(404).send({message: `El producto no existe`})	
		res.status(200).send({product: product})	
	})
})

//POST sirve como Insercción
app.post('/api/product', (req, res) => {
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
})

//PUT sirve como Actualización
app.put('/api/product/:id', (req, res) => {
	let id = req.params.id
	let update = req.body
	Product.findByIdAndUpdate(id,update, (err, productUpdate) => {
		if(err) res.status(500).send({message: `Error a la hora de eliminar el producto : ${err}`})		
		res.status(200).send({product: productUpdate})
	})
})

//DELETE sirve como Eliminación
app.delete('/api/product/:id', (req, res) => {
	let id = req.params.id

	Product.findById(id,(err,product) =>{
		if(err) res.status(500).send({message: `Error a la hora de borrar el producto : ${err}`})

		product.remove(err =>{
			if(err) res.status(500).send({message: `Error a la hora de borrar el producto : ${err}`})
				res.status(200).send({message: `El producto ha sido elimimado`})
		})	
	})
})

mongoose.connect('mongodb://localhost:27017/shop', (err,res) => {
	if(err) throw err
	console.log('Conexión a la base de datos establecida...!')
	app.listen(port, () => {
		console.log(`API REST Corriendo en http://localhost:${port}`)
	})	
});
