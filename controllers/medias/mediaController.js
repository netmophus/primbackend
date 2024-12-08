const Media = require('../../models/medias/Media');
const Category = require('../../models/medias/Category');

// Ajouter un média (photo ou vidéo)
exports.addMedia = async (req, res) => {
  try {
    console.log('Requête reçue pour ajouter un média :', req.body);

    const { categoryId, type, description } = req.body;
    let url = req.body.url;

    // Vérification des champs requis
    if (!categoryId || !type) {
      console.log('Données manquantes :', { categoryId, type });
      return res.status(400).json({ message: 'Le categoryId et le type sont requis.' });
    }

    // Vérifiez si un fichier a été uploadé pour une image
    if (req.file && type === 'image') {
      url = `/uploads/media/${req.file.filename}`;
    }

    // Vérification de la catégorie
    const category = await Category.findById(categoryId);
    if (!category) {
      console.log('Catégorie introuvable pour categoryId :', categoryId);
      return res.status(404).json({ message: 'Catégorie non trouvée.' });
    }

    // Vérification du type
    if (type !== category.type) {
      console.log(`Type incompatible : type=${type}, category.type=${category.type}`);
      return res.status(400).json({
        message: `Le type du média (${type}) ne correspond pas au type de la catégorie (${category.type}).`,
      });
    }

    // Création du média
    const media = new Media({ categoryId, type, url, description });
    const savedMedia = await media.save();

    console.log('Média enregistré avec succès :', savedMedia);
    res.status(201).json(savedMedia);
  } catch (error) {
    console.error('Erreur lors de l\'ajout du média :', error);
    res.status(500).json({ message: 'Erreur lors de l\'ajout du média.', error });
  }
};




// Récupérer les médias par catégorie
exports.getMediaByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const media = await Media.find({ categoryId });

    if (!media.length) {
      return res.status(404).json({ message: 'Aucun média trouvé pour cette catégorie.' });
    }

    res.status(200).json(media);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des médias.', error });
  }
};

// Supprimer un média
exports.deleteMedia = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedMedia = await Media.findByIdAndDelete(id);

    if (!deletedMedia) {
      return res.status(404).json({ message: 'Média non trouvé.' });
    }

    res.status(200).json({ message: 'Média supprimé avec succès.' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression du média.', error });
  }
};


// Obtenir tous les médias par catégorie avec le suffixe front
exports.getMediaByCategoryFront = async (req, res) => {
  try {
    const { categoryId } = req.params;

    if (!categoryId) {
      return res.status(400).json({ message: 'L\'ID de la catégorie est requis.' });
    }

    const mediaList = await Media.find({ categoryId });
    res.status(200).json(mediaList);
  } catch (error) {
    console.error('Erreur lors de la récupération des médias:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des médias.' });
  }
};