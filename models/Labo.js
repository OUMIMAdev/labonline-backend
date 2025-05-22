// models/Labo.js
const mongoose = require('mongoose');

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
