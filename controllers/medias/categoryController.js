const Category = require('../../models/medias/Category');

// Créer une nouvelle catégorie
exports.createCategory = async (req, res) => {
  try {
    console.log("Requête reçue pour créer une catégorie :", req.body); // Log des données reçues

    const { name, type } = req.body;

    // Validation des champs
    if (!name || !type) {
      console.log("Erreur : Le nom ou le type de la catégorie est manquant."); // Log des erreurs de validation
      return res.status(400).json({ message: "Les champs 'name' et 'type' sont requis." });
    }

    // Vérification du type
    if (!['image', 'video'].includes(type)) {
      console.log("Erreur : Le type de catégorie est invalide."); // Log pour un type non valide
      return res.status(400).json({ message: "Le type doit être 'image' ou 'video'." });
    }

    const category = new Category({ name, type });
    const savedCategory = await category.save();

    console.log("Catégorie créée avec succès :", savedCategory); // Log pour confirmer la création
    res.status(201).json(savedCategory);
  } catch (error) {
    console.error("Erreur lors de la création de la catégorie :", error); // Log pour afficher les erreurs
    res.status(500).json({ message: "Erreur lors de la création de la catégorie.", error });
  }
};



exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params; // ID de la catégorie à mettre à jour
    const { name, type } = req.body; // Champs à mettre à jour

    // Validation des champs
    if (!name && !type) {
      console.log("Erreur : Les champs 'name' ou 'type' sont manquants."); // Log des erreurs de validation
      return res.status(400).json({ message: "Les champs 'name' ou 'type' sont requis." });
    }

    // Validation du type s'il est fourni
    if (type && !['image', 'video'].includes(type)) {
      console.log("Erreur : Le type de catégorie est invalide."); // Log pour un type non valide
      return res.status(400).json({ message: "Le type doit être 'image' ou 'video'." });
    }

    // Recherche et mise à jour de la catégorie
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { name, type },
      { new: true, runValidators: true } // Retourne la catégorie mise à jour
    );

    // Vérification si la catégorie existe
    if (!updatedCategory) {
      console.log("Erreur : Catégorie non trouvée."); // Log pour une catégorie inexistante
      return res.status(404).json({ message: "Catégorie non trouvée." });
    }

    console.log("Catégorie mise à jour avec succès :", updatedCategory); // Log pour confirmer la mise à jour
    res.status(200).json(updatedCategory);
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la catégorie :", error); // Log pour afficher les erreurs
    res.status(500).json({ message: "Erreur lors de la mise à jour de la catégorie.", error });
  }
};



// Récupérer toutes les catégories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des catégories.', error });
  }
};

// Supprimer une catégorie
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res.status(404).json({ message: 'Catégorie non trouvée.' });
    }

    res.status(200).json({ message: 'Catégorie supprimée avec succès.' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression de la catégorie.', error });
  }
};


// Obtenir toutes les catégories avec le suffixe front
exports.getCategoriesFront = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    console.error('Erreur lors de la récupération des catégories:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des catégories.' });
  }
};