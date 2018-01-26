module.exports = {
	port: process.env.PORT || 2000,
	db: process.env.MONGODB || 'mongodb://localhost:27017/shop',
	SECRET_TOKEN:'miclavedetokens'
}