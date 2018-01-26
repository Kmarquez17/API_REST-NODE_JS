'use strict'

const express = require('express')
const UserCtrs = require('../controller/user')
const ProductCtrs = require('../controller/product')
const auth = require('../middlewares/auth')

const api = express.Router()

const Ejemplo = require('../controller/ejemplo')
api.get('/nacimiento', Ejemplo.getejemplo)

//Usuario
api.post('/signup',UserCtrs.signUp)
api.post('/signin',UserCtrs.signIn)

//Producto
//Get sirve como consulta
api.get('/product',ProductCtrs.getproducts)
api.get('/product/:id', ProductCtrs.getproduct)
//POST sirve como Insercción
api.post('/product', ProductCtrs.saveproduct)
//PUT sirve como Actualización
api.put('/product/:id',ProductCtrs.updateproduct)
//DELETE sirve como Eliminación
api.delete('/product/:id', ProductCtrs.deleteproduct)

api.get('/private', auth, (req,res) => {
	res.status(200).send({message: `Tienes Accesos`})
})

module.exports = api