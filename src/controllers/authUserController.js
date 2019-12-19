
const jwt = require('jsonwebtoken')

exports.authUser = async (identificate) => {
  const token = jwt.sign({ identificate }, 'keySecret', {
    expiresIn: 1800
  })
  //   console.log(token)
  return { authUser: true, token }
}

exports.authorize = async (headers) => {
  var token = headers
  // console.log(token)

  if (!token) { return { statusCode: 401, auth: false, mensagem: 'Não autorizado' } }

  jwt.verify(token, 'keySecret', function (err, decoded) {
    if (err) { return { statusCode: 401, auth: false, mensagem: 'Não autorizado' } }
    return { statusCode: 200, data: decoded.identificate }
  })
}
