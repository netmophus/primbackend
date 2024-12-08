const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware'); // Importer le middleware
const {
  createSlider,
  updateSlider,
  getSliders,
  deleteSlider,
  getSlidersForFrontend
 
} = require('../controllers/sliderController');

// Route pour récupérer tous les sliders
router.get('/', authenticate, getSliders);

// Route pour créer un slider
//router.post('/', upload.single('image'), createSlider);
// Route pour créer un slider
router.post('/', authenticate, upload, createSlider);

// Route pour mettre à jour un slider avec un fichier uploadé
router.put('/:id', authenticate, upload , updateSlider);

// Route pour supprimer un slider
router.delete('/:id', authenticate, deleteSlider);

// Route pour récupérer les sliders pour le frontend
router.get('/front', getSlidersForFrontend);


module.exports = router;
