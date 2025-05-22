// routes/labos.js
const express = require('express');
const router = express.Router();
const Labo = require('../models/Labo');

// Route GET /api/labos
router.get('/', async (req, res) => {
  try {
    const labos = await Labo.find({});
    res.json(labos);
  } catch (error) {
    console.error('Erreur lors de la récupération des labos:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});
// Route GET /api/labos/near?lng=2.45&lat=36.59&maxDistance=5000
router.get('/near', async (req, res) => {
  const { lng, lat, maxDistance = 5000 } = req.query;

  if (!lng || !lat) {
    return res.status(400).json({ message: "Coordonnées manquantes" });
  }

  try {
    const labos = await Labo.find({
      location: {
        $near: {
          $geometry: { type: "Point", coordinates: [parseFloat(lng), parseFloat(lat)] },
          $maxDistance: parseInt(maxDistance)
        }
      }
    });
    res.json(labos);
  } catch (error) {
    console.error('Erreur géospatiale :', error);
    res.status(500).json({ message: "Erreur lors de la recherche des labos proches" });
  }
});
// Route DELETE /api/labos/:id
router.delete('/:id', async (req, res) => {
  try {
    const labo = await Labo.findByIdAndDelete(req.params.id);
    if (!labo) {
      return res.status(404).json({ message: 'Labo non trouvé' });
    }
    res.json({ message: 'Labo supprimé avec succès' });
  } catch (error) {
    console.error('Erreur suppression labo :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});
router.get('/:id', async (req, res) => {
  try {
    const labo = await Labo.findById(req.params.id);
    if (!labo) return res.status(404).json({ message: 'Labo non trouvé' });
    res.json(labo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});
router.post('/', async (req, res) => {
  try {
    const newLabo = new Labo(req.body);
    const savedLabo = await newLabo.save();
    res.status(201).json(savedLabo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
module.exports = router;
