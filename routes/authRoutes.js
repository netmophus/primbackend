const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authMiddleware');
const checkPermissions = require('../middlewares/checkPermission');
const { registerAdmin, loginAdmin, getUsers, getUserById, createUser, updateUser, deleteUser } = require('../controllers/authController');
// Route pour l'inscription
router.post('/register', registerAdmin);

// Route pour la connexion
router.post('/login', loginAdmin);

// Route pour récupérer tous les utilisateurs
router.get('/users', authenticate, checkPermissions('read'), getUsers);

// Route pour récupérer un utilisateur par ID
router.get('/users/:id', authenticate, checkPermissions('read'), getUserById);

// Route pour créer un utilisateur
router.post('/users', authenticate, checkPermissions('write'), createUser);

// Route pour mettre à jour un utilisateur
router.put('/users/:id', authenticate, checkPermissions('write'), updateUser);

// Route pour supprimer un utilisateur
router.delete('/users/:id', authenticate, checkPermissions('delete'), deleteUser);

module.exports = router;
