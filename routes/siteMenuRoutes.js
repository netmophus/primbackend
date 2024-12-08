const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authMiddleware');

const {
  getAllMenus,
  getMenuById,
  createMenu,
  updateMenu,
  deleteMenu,
} = require('../controllers/siteMenuController');

// Route pour récupérer tous les menus
router.get('/', authenticate, getAllMenus);

// Route pour récupérer un menu par ID
router.get('/:id', authenticate, getMenuById);

// Route pour créer un nouveau menu
router.post('/', authenticate, createMenu);

// Route pour mettre à jour un menu
router.put('/:id', authenticate, updateMenu);

// Route pour supprimer un menu
router.delete('/:id', authenticate, deleteMenu);

module.exports = router;
