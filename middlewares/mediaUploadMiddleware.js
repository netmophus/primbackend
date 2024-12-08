const multer = require('multer');
const path = require('path');

// Configuration de stockage avec `multer`
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Répertoire pour stocker les fichiers
    cb(null, 'uploads/media/');
  },
  filename: (req, file, cb) => {
    // Génère un nom unique pour le fichier
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

// Filtrer les types de fichiers acceptés
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
    cb(null, true);
  } else {
    cb(new Error('Seuls les fichiers image et vidéo sont acceptés.'), false);
  }
};

// Limites de taille
const limits = {
  fileSize: 50 * 1024 * 1024, // Limite de 50 Mo
};

// Initialisation de `multer`
const upload = multer({
  storage,
  fileFilter,
  limits,
});

module.exports = upload.single('file'); // Pour un seul fichier
