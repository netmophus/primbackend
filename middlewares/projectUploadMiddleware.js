const multer = require('multer');
const path = require('path');

// Configuration du stockage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/project'); // Répertoire spécifique pour les projets
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname); // Extension du fichier
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  },
});

// Filtrer les fichiers pour accepter uniquement les images
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const ext = path.extname(file.originalname).toLowerCase();
  const mimeType = allowedTypes.test(file.mimetype);

  if (mimeType && allowedTypes.test(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Type de fichier non pris en charge. Veuillez télécharger une image (jpeg, jpg, png, gif).'), false);
  }
};

// Initialisation de Multer
const projectUploadMiddleware = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limite de taille : 5MB
  fileFilter: fileFilter,
});

module.exports = projectUploadMiddleware;
