const Article = require('../../models/infooficielle/Article');
const mongoose = require('mongoose');


// Récupérer les articles pour une carte donnée
const getArticlesFront = async (req, res) => {
  try {
    const { cardId } = req.params;

    // Vérifier que cardId est bien fourni
    if (!cardId) {
      return res.status(400).json({ message: 'L\'ID de la carte est requis.' });
    }

    // Récupérer les articles associés à la carte
    const articles = await Article.find({ cardId });

    // Vérifier si des articles ont été trouvés
    if (articles.length === 0) {
      return res.status(404).json({ message: 'Aucun article trouvé pour cette carte.' });
    }

    // Retourner les articles
    res.status(200).json(articles);
  } catch (error) {
    console.error('Erreur lors de la récupération des articles pour le frontend :', error);
    res.status(500).json({ message: 'Erreur interne du serveur.', error });
  }
};

module.exports = {
  getArticlesFront,
};

// Récupérer tous les articles d’une carte
const getArticlesByCardId = async (req, res) => {
  try {
    const { cardId } = req.params;
    const articles = await Article.find({ cardId }).sort({ createdAt: -1 });
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des articles.', error });
  }
};




const createArticle = async (req, res) => {
  try {
    console.log("Données reçues :", req.body); // Log des données reçues

    const { cardId, title, content, videos, images } = req.body;

    if (!mongoose.Types.ObjectId.isValid(cardId)) {
      return res.status(400).json({ message: "cardId invalide." });
    }

    const newArticle = new Article({ cardId, title, content, videos, images });
    await newArticle.save();
    res.status(201).json(newArticle);
  } catch (error) {
    console.error("Erreur lors de la création de l’article :", error);
    res.status(500).json({ message: "Erreur lors de la création de l’article.", error });
  }
};


// Mettre à jour un article
const updateArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, videos } = req.body;

    // Gestion des fichiers uploadés
    const images = req.files
      ? req.files
          .filter((file) => file.mimetype.startsWith('image/'))
          .map((file) => ({
            url: `/uploads/articles/${file.filename}`,
            description: '', // Ajouter des descriptions via une autre logique
          }))
      : [];

    const updatedArticle = await Article.findByIdAndUpdate(
      id,
      { title, content, videos, $push: { images } },
      { new: true }
    );

    if (!updatedArticle) {
      return res.status(404).json({ message: 'Article non trouvé.' });
    }

    res.status(200).json(updatedArticle);
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l’article :', error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour de l’article.', error });
  }
};




// Supprimer un article
const deleteArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const article = await Article.findByIdAndDelete(id);
    if (!article) {
      return res.status(404).json({ message: 'Article non trouvé.' });
    }
    res.status(200).json({ message: 'Article supprimé avec succès.' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression de l’article.', error });
  }
};

module.exports = {
  getArticlesByCardId,
  createArticle,
  updateArticle,
  deleteArticle,
  getArticlesFront,
};
