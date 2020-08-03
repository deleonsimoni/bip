const mongoose = require('mongoose');

const InventarySchema = new mongoose.Schema({

 fullname: {
    type: String,
    required: true
  },
  observations: {
    type: String,
    required: true
  },
  datebegin: {
    type: Date,
  },
  dateend: {
    type: Date,
  },
  //Empresa que fará o inventário
  idclient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client'
  },
  idemployee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee'
  },
  headFile: {
    type: String,
  },
  fileClient: {
    type: String,
  },
  // Inicio Chaves
  //Usuario criado
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
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
  clientFile: [],
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  versionKey: false
});


module.exports = mongoose.model('Inventary', InventarySchema);
