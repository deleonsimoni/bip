const mongoose = require('mongoose');

const InventarySchema = new mongoose.Schema({

  fullname: {
    type: String,
    required: true
  },
  observations: {
    type: String
  },

  begin: {
    type: Date
  },
  end: {
    type: Date
  },

  // Inicio Chaves
  //Usuario criador
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  //Empresa que fará o inventário
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client'
  },

  collectorsInitial: {

  },

  collectors: [{
    //usuario da empresa que fara a coleta
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    //colector vinculado
    collectorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Collector'
    },
    //bipagem dos produtos por seção
    bip: [{
      section: {
        cod: {
          type: String
        },
        barCodes: {
          type: String
        }
      }
    }]
  }],

  campoReferencia: {
    type: String
  },
  campoRefAnd: {
    type: String
  },
  campoDescricao: {
    type: String
  },
  campoPreco: {
    type: String
  },
  campoSituacao: {
    type: String
  },
  campoSetor: {
    type: String
  },
  //Fim chaves

  //produtos do arquivo do cliente a serem inventariados
  productsClient: [{
    name: {
      type: String
    },
    cod: {
      type: String
    },
  }],


  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  versionKey: false
});


module.exports = mongoose.model('Inventary', InventarySchema);
