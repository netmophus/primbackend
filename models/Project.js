const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Nom du projet
  image: { type: String, required: true }, // URL ou chemin de l'image principale (uploadée)
  description: { type: String, required: true }, // Courte description affichée sur la carte
  details: { // Contenu détaillé à afficher dans le modal
    text: { type: String, required: true }, // Texte principal des détails
    images: [ // Liste facultative d'images supplémentaires avec descriptions
      {
        path: { type: String, required: true }, // Chemin ou URL de l'image uploadée
        description: { type: String }, // Description de l'image (facultative)
      }
    ],
    videos: [ // Liste facultative de vidéos avec descriptions
      {
        url: { type: String, required: true }, // URL de la vidéo
        description: { type: String }, // Description de la vidéo (facultative)
      }
    ],
  },
});

const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;
