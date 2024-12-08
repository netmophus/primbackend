const Card = require('../../models/infooficielle/Carte');

const getCardsFront = async (req, res) => {
  const { tabId } = req.params;

  try {
    const cards = await Card.find({ tabId }).sort({ createdAt: -1 }); // Trie par date décroissante
    res.status(200).json(cards);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des cartes.', error });
  }
};

const getCardsByTabId = async (req, res) => {
  try {
    const { tabId } = req.params;

    console.log(`Récupération des cartes pour tabId : ${tabId}`); // Log pour déboguer

    const cards = await Card.find({ tabId }).sort({ createdAt: -1 });

    if (!cards.length) {
      return res.status(404).json({ message: 'Aucune carte trouvée pour cet onglet.' });
    }

    const cardsWithFullImagePath = cards.map((card) => ({
      ...card._doc,
      image: `${req.protocol}://${req.get('host')}${card.image}`, // Génère l'URL complète
    }));

    res.status(200).json(cardsWithFullImagePath);
  } catch (error) {
    console.error('Erreur lors de la récupération des cartes :', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des cartes.', error });
  }
};


// Créer une nouvelle carte
const createCard = async (req, res) => {
  try {
    console.log('Requête reçue pour créer une carte :', req.body);
    console.log('Fichier reçu :', req.file);

    const { tabId, description } = req.body;

    if (!req.file) {
      console.error('Aucun fichier reçu.');
      return res.status(400).json({ message: 'Image requise.' });
    }

    const newCard = new Card({
      tabId,
      image: `/uploads/cards/${req.file.filename}`,
      description,
    });

    const savedCard = await newCard.save();

    console.log('Nouvelle carte créée :', savedCard);
    res.status(201).json(savedCard);
  } catch (error) {
    console.error('Erreur lors de la création de la carte :', error);
    res.status(500).json({ message: 'Erreur interne lors de la création de la carte.', error });
  }
};


// Mettre à jour une carte
const updateCard = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCard = await Card.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedCard) {
      return res.status(404).json({ message: 'Carte non trouvée.' });
    }
    res.status(200).json(updatedCard);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la carte.', error });
  }
};

// Supprimer une carte
const deleteCard = async (req, res) => {
  try {
    const { id } = req.params;
    const card = await Card.findByIdAndDelete(id);
    if (!card) {
      return res.status(404).json({ message: 'Carte non trouvée.' });
    }
    res.status(200).json({ message: 'Carte supprimée avec succès.' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression de la carte.', error });
  }
};

module.exports = {
  getCardsByTabId,
  createCard,
  updateCard,
  deleteCard,
  getCardsFront,
};
