const mongoose = require('mongoose');

const InventarySchema = new mongoose.Schema({

  fullname: {
    type: String,
    required: true
  },
  observation: {
    type: String
  },
  // Inicio Chaves
  //Usuario criado
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  //Empresa que fará o inventário
  cliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client'
  },
  //Filial que será feito o inventário
  // clientBranch: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'ClientBranch'
  // },

  collectors: [{
    //usuario da empresa que fara a coleta
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    //colector vinculado
    collector: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Collector'
    },
    //bipagem dos produtos por seção
    bip: [{
      section: {
        cod: { type: String },
        barCodes: { type: String }
      }
    }]
  }],

  //Fim chaves

  //produtos do arquivo do cliente a serem inventariados
  productsClient: [{
    name: { type: String },
    cod: { type: String },
  }],

  begin: {
    type: Date
  },
  end: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  versionKey: false
});


module.exports = mongoose.model('Inventary', InventarySchema);
