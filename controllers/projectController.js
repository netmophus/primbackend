const Project = require('../models/Project');

// // Créer un projet
// const createProject = async (req, res) => {
//   try {
//     console.log('Requête reçue pour créer un projet :', req.body);

//     const { title, description, details } = req.body;
//     const imagePath = req.file ? req.file.path : null; // Récupérer le chemin de l'image

//     console.log('Chemin de l\'image :', imagePath); // Log du chemin de l'image
//     console.log('Détails reçus :', details); // Log des détails

//     // Création du projet dans la base de données
//     const project = new Project({
//       title,
//       image: imagePath,
//       description,
//       details: JSON.parse(details), // Utilisez JSON.parse uniquement si nécessaire
//     });

//     console.log('Enregistrement dans la base de données...');
//     await project.save();
//     console.log('Projet enregistré avec succès :', project);

//     res.status(201).json({
//       message: 'Projet créé avec succès',
//       data: project,
//     });
//   } catch (error) {
//     console.error('Erreur lors de la création du projet :', error.message);
//     res.status(500).json({
//       message: 'Erreur lors de la création du projet',
//       error: error.message,
//     });
//   }
// };

const createProject = async (req, res) => {
  try {
    const { title, description, details } = req.body;
    const imagePath = req.file ? `/uploads/project/${req.file.filename}` : null;

    console.log('Chemin complet de l\'image :', imagePath);

    const project = new Project({
      title,
      image: imagePath, // Utilise le chemin complet
      description,
      details: JSON.parse(details),
    });

    await project.save();

    res.status(201).json({
      message: 'Projet créé avec succès',
      data: project,
    });
  } catch (error) {
    console.error('Erreur lors de la création du projet :', error.message);
    res.status(500).json({
      message: 'Erreur lors de la création du projet',
      error: error.message,
    });
  }
};


// Récupérer tous les projets
const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des projets', error: error.message });
  }
};

// Récupérer un projet par ID
const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Projet non trouvé' });
    }

    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération du projet', error: error.message });
  }
};

const getFrontProjects = async (req, res) => {
  console.log('Début de la récupération des projets...');
  try {
    const projects = await Project.find({}, 'title description image details');
    console.log('Projets récupérés :', projects);

    if (!projects.length) {
      console.warn('Aucun projet trouvé.');
    }

    res.status(200).json(projects);
  } catch (error) {
    console.error('Erreur lors de la récupération des projets :', error.message);
    res.status(500).json({ message: 'Erreur interne', error: error.message });
  }
};






module.exports = { createProject, getAllProjects, getProjectById, getFrontProjects };
