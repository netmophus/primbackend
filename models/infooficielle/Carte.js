const mongoose = require('mongoose');

const CardSchema = new mongoose.Schema(
  {
    tabId: {
      type: mongoose.Schema.Types.ObjectId, // Lien avec l'onglet
      ref: 'Onglet',
      required: true,
    },
    image: {
      type: String, // URL ou chemin de l'image principale
      required: true,
    },
    description: {
      type: String, // Brève description
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Card', CardSchema);
