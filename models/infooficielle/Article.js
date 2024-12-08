// const mongoose = require('mongoose');

// const ArticleSchema = new mongoose.Schema(
//   {
//     cardId: {
//       type: mongoose.Schema.Types.ObjectId, // Lien avec la carte
//       ref: 'Card',
//       required: true,
//     },
//     title: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     content: {
//       type: String, // Texte détaillé de l'article
//       required: true,
//     },
//     videos: {
//       type: [String], // URLs des vidéos
//       default: [],
//     },
//     images: {
//       type: [String], // URLs des images supplémentaires
//       default: [],
//     },
//     createdAt: {
//       type: Date,
//       default: Date.now,
//     },
//     updatedAt: {
//       type: Date,
//       default: Date.now,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// module.exports = mongoose.model('Article', ArticleSchema);



const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema(
  {
    cardId: {
      type: mongoose.Schema.Types.ObjectId, // Lien avec la carte
      ref: 'Card',
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String, // Texte détaillé de l'article
      required: true,
    },
    videos: [
      {
        url: {
          type: String, // URL de la vidéo
          required: false, // Facultatif
          trim: true,
        },
        description: {
          type: String, // Description de la vidéo
          required: false, // Facultatif
          trim: true,
        },
      },
    ],
    images: [
      {
        url: {
          type: String, // URL ou chemin de l'image
          required: false, // Facultatif
          trim: true,
        },
        description: {
          type: String, // Description de l'image
          required: false, // Facultatif
          trim: true,
        },
      },
    ],
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

module.exports = mongoose.model('Article', ArticleSchema);
