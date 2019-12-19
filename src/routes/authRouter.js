const authController = require('../controllers/authUserController')

exports.authenticate = (req, res, next) => {
  try {
    const res = authController.authorize(req.headers.acesstoken)

    req.idUser = res.data
    return next()
  } catch (error) {
    if (error.code === 401) { return res.send(401, { mensagem: error.mensagem }) }

    return res.send(500, { mensagem: 'erro ao validar token' })
  }
}
