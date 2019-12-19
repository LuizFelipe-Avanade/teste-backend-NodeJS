const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  senha: {
    type: String,
    required: true
  },
  telefones: [{
    numero: {
      type: Number,
      required: true
    },
    ddd: {
      type: Number,
      required: true
    }
  }],
  DtCreated: {
    type: Date
  },
  DtUpdate: {
    type: Date
  },
  lastLogin: {
    type: Date
  }
})

module.exports = mongoose.model('User', UserSchema)
