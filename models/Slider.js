//const mongoose = require('mongoose');

// const sliderSchema = new mongoose.Schema({
//   title: { type: String, required: true }, // Nom du slider (par exemple : "Slider principal")
//   slides: [
//     [
//       {
//         type: { type: String, enum: ['image', 'video'], required: true }, // Détermine si c'est une image ou une vidéo
//         src: { type: String, required: true }, // Chemin du fichier pour les images ou URL pour les vidéos
//         text: { type: String, required: false }, // Texte associé (optionnel pour les vidéos)
//       },
//     ],
//   ],
//   lastUpdated: { type: Date, default: Date.now }, // Date de dernière mise à jour
// });

// module.exports = mongoose.model('Slider', sliderSchema);



const mongoose = require('mongoose');

const sliderSchema = new mongoose.Schema({
  title: { type: String }, // Le titre devient optionnel
  slides: {
    type: [[{
      type: { type: String, enum: ['image', 'video'], required: true },
      src: { type: String, required: true },
      text: { type: String, required: false },
    }]],
    validate: {
      validator: function (value) {
        console.log('Données reçues pour validation des slides :', value);
        // Vérifie que chaque rangée contient exactement deux éléments
        return value.every((row) => Array.isArray(row) && row.length === 2);
      },
      message: 'Chaque rangée doit contenir exactement deux éléments.',
    },
  },
  lastUpdated: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Slider', sliderSchema);
