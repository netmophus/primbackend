const Ministre = require('../models/Ministre');  // Import du modèle

// Récupérer tous les ministres
const getAllMinisters = async (req, res) => {
  try {
    const ministers = await Ministre.find();
    res.json(ministers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Récupérer un ministre par son ID
const getMinisterById = async (req, res) => {
  try {
    const minister = await Ministre.findById(req.params.id);
    if (!minister) {
      return res.status(404).json({ message: 'Ministre non trouvé' });
    }
    res.json(minister);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Ajouter un nouveau ministre
// Ajouter un nouveau ministre
const createMinister = async (req, res) => {
  const { name, portfolio, facebook, twitter, linkedin, website } = req.body;
  const image = req.file ? req.file.path : '';  // Vérifier si l'image a été téléchargée

  const newMinister = new Ministre({
    name,
    portfolio,
    image,
    facebook: facebook || '#',
    twitter: twitter || '#',
    linkedin: linkedin || '#',
    website: website || '#',
  });

  try {
    const savedMinister = await newMinister.save();
    res.status(201).json(savedMinister);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Modifier un ministre par son ID
const updateMinister = async (req, res) => {
  try {
    const image = req.file ? req.file.path : undefined;  // Vérifier si une nouvelle image a été téléchargée

    const updatedMinister = await Ministre.findByIdAndUpdate(
      req.params.id,
      { ...req.body, image }, 
      { new: true }
    );

    if (!updatedMinister) {
      return res.status(404).json({ message: 'Ministre non trouvé' });
    }
    res.json(updatedMinister);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Supprimer un ministre par son ID
const deleteMinister = async (req, res) => {
  try {
    const deletedMinister = await Ministre.findByIdAndDelete(req.params.id);
    if (!deletedMinister) {
      return res.status(404).json({ message: 'Ministre non trouvé' });
    }
    res.json({ message: 'Ministre supprimé' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Récupérer les ministres pour le frontend
// Récupérer les ministres pour le frontend
const getMinistreForFront = async (req, res) => {
  console.log('Appel de l\'API pour récupérer les ministres');  // Log lorsque l'API est appelée

  try {
    const ministers = await Ministre.find();  // Récupérer tous les ministres
    console.log('Ministres récupérés:', ministers);  // Log des ministres récupérés
    res.json(ministers);  // Retourner les ministres au frontend
  } catch (error) {
    console.error('Erreur lors de la récupération des ministres:', error);  // Log l'erreur
    res.status(500).json({ message: 'Erreur du serveur' });
  }
};






module.exports = {
  getAllMinisters,
  getMinisterById,
  createMinister,
  updateMinister,
  deleteMinister,
  getMinistreForFront,
};
