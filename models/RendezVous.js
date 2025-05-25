const mongoose = require('mongoose');

const RendezVousSchema = new mongoose.Schema({
  nom: String,
  email: String,
  date: String,
  heure: String,
  laboId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Labo',
    required: true
  },
  statut: { type: String, default: 'En attente' }
});

module.exports = mongoose.model('RendezVous', RendezVousSchema);
