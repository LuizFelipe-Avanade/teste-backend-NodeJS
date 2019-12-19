const userSchema = require('../models/User')

exports.createUser = async (data) => {
  try {
    const verifyExists = await userSchema.findOne({ email: data.email })

    if (verifyExists) { return { mensagem: 'E-mail já cadastrado! ' } }

    const response = await userSchema.create(data)

    return response
  } catch (error) {
    return { mensagem: error }
  }
}

exports.updateDate = async (id, params) => {
  const res = await userSchema.findByIdAndUpdate(id, params)

  return res
}

exports.getUsers = async (data) => {
  try {
    const users = userSchema.findOne({ email: data.email, senha: data.senha })

    return users
  } catch (error) {
    return { mensagem: error }
  }
}

exports.getUserById = async (idUser) => {
  try {
    const user = await userSchema.findOne({ _id: idUser })

    return user
  } catch (error) {
    return { mensagem: error }
  }
}
