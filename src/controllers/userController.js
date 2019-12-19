const userRepository = require('../repositories/userRepository')
const authUserController = require('../controllers/authUserController')

exports.signUp = async (req, res, next) => {
  try {
    const data = await userRepository.createUser(req.body)

    if (data.mensagem) { return res.status(400).json(data) }

    await userRepository.updateDate(data.id, { DtCreated: new Date(), DtUpdate: new Date(), lastLogin: new Date() })

    const token = await authUserController.authUser(data.id)

    return res.status(201).json({
      token: token,
      data: {
        id: data._id,
        nome: data.nome,
        email: data.email,
        telefones: data.telefones
      }
    })
  } catch (error) {
    return res.status(500).json({ mensagem: error })
  }
}

exports.signIn = async (req, res, nex) => {
  try {
    const data = await userRepository.getUsers(req.body)

    if (!data) { return res.status(400).json({ mensagem: 'Usuário e/ou senha inválidos' }) }

    await userRepository.updateDate(data.id, { lastLogin: new Date() })

    const token = await authUserController.authUser(data.id)

    return res.status(200).json({
      token: token,
      data: {
        id: data._id,
        nome: data.nome,
        email: data.email,
        telefones: data.telefones
      }
    })
  } catch (error) {
    return res.status(500).json({ mensagem: error })
  }
}

exports.getUser = async (req, res, next) => {
  try {
    const data = await userRepository.getUserById(req.params.idUser)

    return res.status(200).json({
      data: {
        id: data._id,
        nome: data.nome,
        email: data.email,
        telefones: data.telefones,
        lastLogin: data.lastLogin
      }
    })
  } catch (error) {
    return res.status(500).json({ mensagem: error })
  }
}
