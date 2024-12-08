const express = require('express');
const router = express.Router();
const MediaController = require('../../controllers/medias/mediaController');
const mediaUploadMiddleware = require('../../middlewares/mediaUploadMiddleware');
// Ajouter un média (photo ou vidéo)
//router.post('/', MediaController.addMedia);
// Route pour ajouter un média
router.post('/', mediaUploadMiddleware, MediaController.addMedia);
// Récupérer les médias par catégorie
router.get('/:categoryId', MediaController.getMediaByCategory);

// Supprimer un média
router.delete('/:id', MediaController.deleteMedia);


// Obtenir tous les médias par catégorie avec le suffixe front
router.get('/getMediaByCategoryFront/:categoryId', MediaController.getMediaByCategoryFront);

module.exports = router;
