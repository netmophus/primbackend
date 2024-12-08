const mongoose = require('mongoose');

// Définition du modèle pour un ministre
const ministreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,  // Nom obligatoire
  },
  portfolio: {
    type: String,
    required: true,  // Portefeuille obligatoire
  },


  image: {
    type: String,
    required: true,
    get: (val) => `/uploads/${val.replace("\\", "/")}`,  // Remplacer les backslashes par des slashes
  },
  

  facebook: {
    type: String,
    default: '#',  // Valeur par défaut si non renseigné
  },
  twitter: {
    type: String,
    default: '#',  // Valeur par défaut si non renseigné
  },
  linkedin: {
    type: String,
    default: '#',  // Valeur par défaut si non renseigné
  },
  website: {
    type: String,
    default: '#',  // Valeur par défaut si non renseigné
  },
}, {
  timestamps: true, // Ajouter les champs createdAt et updatedAt automatiquement
});

// Création du modèle basé sur le schéma
const Ministre = mongoose.model('Ministre', ministreSchema);

module.exports = Ministre;
