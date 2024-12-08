const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authMiddleware'); // Middleware d'authentification
const { 
  getInfoRedBanner, 
  updateInfoRedBanner,
  createInfoRedBanner,
  getInfoRedBannerForFront,
  addNewsFlash,
  getNewsFlash,
  updateNewsFlash,
  deleteNewsFlash ,
} = require('../controllers/inforedbannerController');




// Routes pour les news flash
router.post('/news-flash', addNewsFlash); // Ajouter une news flash
router.get('/news-flash', getNewsFlash); // Récupérer toutes les news flash
router.put('/news-flash', updateNewsFlash); // Mettre à jour une news flash
router.delete('/news-flash/:id', deleteNewsFlash); // Supprimer une news flash par ID





// Route pour récupérer les informations du banner
router.get('/', authenticate, getInfoRedBanner);

// Route pour mettre à jour les informations du banner
router.put('/', authenticate, updateInfoRedBanner);

// Route pour créer une nouvelle bannière
router.post('/', authenticate, createInfoRedBanner);

// Route pour récupérer les informations du banner pour le frontend
router.get('/public/front', getInfoRedBannerForFront);

module.exports = router;
