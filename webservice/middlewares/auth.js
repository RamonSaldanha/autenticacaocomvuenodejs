const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth')

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if(!authHeader)
    return res.status(401).send({ error: 'O token não foi informado'})

  const parts = authHeader.split(' ')
  
  if(!parts.length === 2 )
    return res.send(401, {error: "Erro no token"})

  const [ scheme, token ] = parts; // separar Bearer do TOKEN

  if(!/^Bearer$/i.test(scheme))
    return res.send(401, {error: "Token mal formatado - use a string Bearer"})
  
  jwt.verify(token, authConfig.secret, (err, decoded) =>{
    if(err) return res.send(401, {error: "Token inválido"})
    req.userId = decoded.id;
    next();
  })

}