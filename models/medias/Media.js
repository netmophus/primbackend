const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema(
  {
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category', // Référence à la collection Category
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ['image', 'video'], // Ajoutez 'image' si c'est votre type pour les photos
    },
    url: {
      type: String,
      required: function () {
        return this.type === 'video'; // L'URL est requise uniquement pour les vidéos
      },
    },
    description: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Media', mediaSchema);
