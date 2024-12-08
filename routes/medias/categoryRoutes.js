const express = require('express');
const router = express.Router();
const CategoryController = require('../../controllers/medias/categoryController');



// Créer une nouvelle catégorie
router.post('/', CategoryController.createCategory);


// Update une nouvelle catégorie
router.put('/', CategoryController.createCategory);


// Récupérer toutes les catégories
router.get('/', CategoryController.getAllCategories);

// Supprimer une catégorie
router.delete('/:id', CategoryController.deleteCategory);


// Obtenir toutes les catégories avec le suffixe front
router.get('/getCategoriesFront', CategoryController.getCategoriesFront);

module.exports = router;
