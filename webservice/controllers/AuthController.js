const { User } = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth')

function generateToken ( params = {}) {
	const token = jwt.sign ( params, authConfig.secret , {
		expiresIn: 86400
	})
	return token
}

module.exports = function(app) {
	
	this.getAuthProfile = async function ( req, res ) {
		const authHeader = req.headers.authorization;
		const parts = authHeader.split(' ')
		const [ scheme, token ] = parts;
		
		jwt.verify(token, authConfig.secret, async function (err, decoded) {
			if(err) return res.send(401, {error: "Token inválido"})
	
			const user = await User.findOne ({
				where: { id: decoded.id }
			})

			user.password = undefined
			res.send({ user: user, token: token})
		})
	}

	this.userList = function(req, res){
		res.send({ ok: true})
	}

	this.login = async function(req, res) {

		const { email, password } = req.body;

		const user = await User.findOne ({
			where: { email: email }
		})

		if(!user)
			return res.status(400).send({ error: 'Usuário não encontrado'})
		
		if(!await bcrypt.compare(password, user.password))
			return res.status(400).send({ error: 'Senha inválida'})
		
		user.password = undefined;

		res.send({
			user, 
			token: generateToken( { id: user.id } )
		})
  }

	this.register = async function ( req, res ) {
		
		const hash = await bcrypt.hash(req.body.password, 10)

		try {
			const user = await User.create({
				email: req.body.email,
				password: hash
			});
			
			res.send ({
				user,
				token: generateToken( { id: user.id } )
			})

		} catch ( error ) {
			res.send('400', error);
		}
		
	}

	return this;

}