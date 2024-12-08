const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Répertoire où les fichiers sont stockés
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limite : 5 Mo par fichier
}).fields([
  { name: 'image0', maxCount: 1 }, // Premier champ image
  { name: 'image1', maxCount: 1 }, // Deuxième champ image
]);

module.exports = upload;
