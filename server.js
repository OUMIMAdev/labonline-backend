const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Connexion MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connecté'))
  .catch(err => console.error('Erreur MongoDB:', err));

// Modèle
const Labo = require('./models/Labo');


// Routes
app.get('/', (req, res) => {
  res.send('Serveur LabOnline OK');
});

// Importer les routes
const laboRoutes = require('./routes/labos');
app.use('/api/labos', laboRoutes);

// Démarrage serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
