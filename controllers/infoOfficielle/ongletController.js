const Onglet = require('../../models/infooficielle/Onglet');




const getOngletsFront = async (req, res) => {
  try {
    console.log('getOngletsFront appelé'); // Log indiquant l'appel
    const onglets = await Onglet.find().sort({ createdAt: 1 });
    console.log('Onglets récupérés :', onglets); // Log des données récupérées
    res.status(200).json(onglets);
  } catch (error) {
    console.error('Erreur dans getOngletsFront :', error); // Log de l'erreur
    res.status(500).json({ message: 'Erreur lors de la récupération des onglets.', error });
  }
};


// Contrôleurs pour les onglets
const getOnglets = async (req, res) => {
  try {
    const onglets = await Onglet.find().sort({ order: 1 }); // Trier par ordre
    res.status(200).json(onglets);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des onglets.', error });
  }
};




const createOnglet = async (req, res) => {
  console.log('Requête reçue pour créer un onglet:', req.body); // Log du corps de la requête
  try {
    const { name, description, order } = req.body;

    const newOnglet = new Onglet({
      name,
      description,
      order,
    });

    await newOnglet.save();

    console.log('Nouvel onglet créé:', newOnglet); // Log du résultat après création
    res.status(201).json(newOnglet);
  } catch (error) {
    console.error('Erreur lors de la création de l’onglet:', error); // Log des erreurs
    res.status(500).json({ message: 'Erreur lors de la création de l’onglet.', error });
  }
};


const updateOnglet = async (req, res) => {
  console.log('ID reçu dans updateOnglet :', req.params.id);
  console.log('Données reçues dans updateOnglet :', req.body);

  try {
    const updatedOnglet = await Onglet.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedOnglet) {
      return res.status(404).json({ message: 'Onglet non trouvé.' });
    }
    res.status(200).json(updatedOnglet);
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l’onglet :', error);
    res.status(500).json({ message: 'Erreur interne.' });
  }
};



const deleteOnglet = async (req, res) => {
  try {
    const { id } = req.params;

    const onglet = await Onglet.findByIdAndDelete(id);
    if (!onglet) {
      return res.status(404).json({ message: 'Onglet non trouvé.' });
    }

    res.status(200).json({ message: 'Onglet supprimé avec succès.' });
  } catch (error) {
    console.error('Erreur lors de la suppression de l’onglet :', error);
    res.status(500).json({ message: 'Erreur lors de la suppression de l’onglet.', error });
  }
};



// Export des contrôleurs
module.exports = {
  // Onglets
  getOnglets,
  createOnglet,
  updateOnglet,
  deleteOnglet,
  getOngletsFront,

  };
