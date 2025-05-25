// models/Labo.js
const mongoose = require('mongoose');

const RendezVousSchema = new mongoose.Schema({
  nom: String,
  email: String,
  date: String,
  heure: String,
  laboId: mongoose.Schema.Types.ObjectId, // référence au laboratoire concerné
  statut: { type: String, default: 'En attente' }
});

module.exports = mongoose.model('RendezVous', RendezVousSchema);

const laboSchema = new mongoose.Schema({
  name: String,
  specialty: String,
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true
    }
  }
});
laboSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Labo', laboSchema);
