module.exports = {
	HOST: "localhost",
	USER: "tinagilmore",
	PASSWORD: "password",
	DB: "hd_server_dev",
	dialect: "postgres",
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	}
}