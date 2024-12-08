const express = require('express');
const router = express.Router();
const {
  getAllMinisters,
  getMinisterById,
  createMinister,
  updateMinister,
  deleteMinister,
  getMinistreForFront
} = require('../controllers/ministreController');
const upload = require('../middlewares/ministreUploadMiddleware');  // Import du middleware pour l'upload

// Récupérer tous les ministres
router.get('/api/ministers', getAllMinisters);
// Route pour récupérer les ministres pour le frontend
router.get('/api/ministers/front', getMinistreForFront);

// Récupérer un ministre par son ID
router.get('/api/ministers/:id', getMinisterById);

// Ajouter un nouveau ministre avec upload d'image
router.post('/api/ministers', upload.single('image'), createMinister);  // 'image' est le champ de l'image dans le formulaire

// Modifier un ministre par son ID avec upload d'image
router.put('/api/ministers/:id', upload.single('image'), updateMinister);  // 'image' est le champ de l'image dans le formulaire

// Supprimer un ministre par son ID
router.delete('/api/ministers/:id', deleteMinister);



module.exports = router;
