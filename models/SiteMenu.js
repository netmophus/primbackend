const mongoose = require('mongoose');

// Définition du schéma pour les menus et sous-menus
const siteMenuSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  subMenus: [
    {
      title: { type: String, required: true },
      path: { type: String, required: true },
      order: { type: Number, default: 0 }, // Ordre des sous-menus
      isActive: { type: Boolean, default: true }, // Sous-menu actif ou non
    },
  ],
  order: {
    type: Number,
    default: 0, // Ordre d'affichage des menus principaux
  },
  isActive: {
    type: Boolean,
    default: true, // Menu actif ou non
  },
  lastUpdated: {
    type: Date,
    default: Date.now, // Date de la dernière mise à jour
  },
});

module.exports = mongoose.model('SiteMenu', siteMenuSchema);
