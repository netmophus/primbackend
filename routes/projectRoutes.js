const express = require('express');
const projectUploadMiddleware = require('../middlewares/projectUploadMiddleware');
const {
  createProject,
  getAllProjects,
  getProjectById,
  getFrontProjects
} = require('../controllers/projectController');

const router = express.Router();

// Route pour créer un projet
router.post('/', projectUploadMiddleware.single('image'), createProject);

// Route pour récupérer tous les projets
router.get('/', getAllProjects);

// Route pour récupérer les informations pour le frontend statique
router.get('/getfront', getFrontProjects);



// Route pour récupérer un projet par son ID
router.get('/:id', getProjectById);


module.exports = router;
