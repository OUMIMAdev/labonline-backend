const express = require('express');
const router = express.Router();
const RendezVous = require('../models/RendezVous');

// POST : Ajouter un RDV
router.post('/', async (req, res) => {
  try {
    const { nom, email, date, heure, laboId } = req.body;
    const nouveauRDV = new RendezVous({ nom, email, date, heure, laboId });
    await nouveauRDV.save();
    res.status(201).json({ message: 'Rendez-vous pris avec succès !' });
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la prise de RDV' });
  }
});

// GET : Tous les RDV
router.get('/', async (req, res) => {
  try {
    const rdvs = await RendezVous.find().populate('laboId');
    res.json(rdvs);
  } catch (err) {
    res.status(500).json({ error: 'Erreur récupération RDV' });
  }
});

module.exports = router;
