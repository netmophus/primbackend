const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true, // Supprime les espaces inutiles
      unique: true, // Assure que le nom de la catégorie est unique
    },
    type: {
      type: String,
      required: true, // Obligatoire
      enum: ['image', 'video'], // Restreint aux valeurs autorisées
    },
  },
  {
    timestamps: true, // Ajoute automatiquement createdAt et updatedAt
  }
);

module.exports = mongoose.model('Category', categorySchema);
