const InfoRedBanner = require('../models/InfoRedBanner');

// Controller pour créer une nouvelle bannière
exports.createInfoRedBanner = async (req, res) => {
  try {
    const { redBannerText, phoneNumbers, address } = req.body;

    // Créer une nouvelle entrée dans la base de données
    const newBanner = new InfoRedBanner({
      redBannerText,
      phoneNumbers,
      address,
    });

    await newBanner.save();
    res.status(201).json({ message: 'Bannière créée avec succès', data: newBanner });
  } catch (error) {
    console.error('Erreur lors de la création de la bannière:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};


exports.getInfoRedBannerForFront = async (req, res) => {
  try {
    // Récupérer les informations du banner depuis la base de données
    const bannerInfo = await InfoRedBanner.findOne();
    if (!bannerInfo) {
      return res.status(404).json({ message: 'Aucune donnée trouvée' });
    }
    res.status(200).json(bannerInfo);
  } catch (error) {
    console.error('Erreur lors de la récupération des données pour le frontend:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};


// Récupérer les informations de InfoRedBanner
exports.getInfoRedBanner = async (req, res) => {
  try {
    const info = await InfoRedBanner.findOne(); // Récupérer le document
    if (!info) {
      return res.status(404).json({ message: 'Informations non trouvées.' });
    }
    res.status(200).json(info);
  } catch (error) {
    console.error('Erreur lors de la récupération des informations :', error);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

// Mettre à jour les informations de InfoRedBanner
exports.updateInfoRedBanner = async (req, res) => {
  const { redBannerText, phoneNumbers, address } = req.body;

  try {
    const info = await InfoRedBanner.findOne(); // Trouver le document existant
    if (!info) {
      return res.status(404).json({ message: 'Informations non trouvées.' });
    }

    // Mise à jour des champs
    if (redBannerText) info.redBannerText = redBannerText;
    if (phoneNumbers) info.phoneNumbers = phoneNumbers;
    if (address) info.address = address;
    info.lastUpdated = Date.now();

    const updatedInfo = await info.save();
    res.status(200).json({ message: 'Informations mises à jour avec succès.', data: updatedInfo });
  } catch (error) {
    console.error('Erreur lors de la mise à jour des informations :', error);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};



exports.addNewsFlash = async (req, res) => {
  try {
    const { text } = req.body;

    // Validation
    if (!text) {
      return res.status(400).json({ message: 'Le texte de la news flash est requis.' });
    }

    // Trouver ou créer une bannière
    let bannerInfo = await InfoRedBanner.findOne();
    if (!bannerInfo) {
      bannerInfo = new InfoRedBanner();
    }

    // Ajouter la nouvelle news flash
    bannerInfo.newsFlash.push({ text });
    await bannerInfo.save();

    res.status(201).json({ message: 'News flash ajoutée avec succès.', data: bannerInfo.newsFlash });
  } catch (error) {
    console.error('Erreur lors de l’ajout de la news flash :', error);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};



exports.getNewsFlash = async (req, res) => {
  try {
    const bannerInfo = await InfoRedBanner.findOne();
    if (!bannerInfo || !bannerInfo.newsFlash.length) {
      return res.status(404).json({ message: 'Aucune news flash trouvée.' });
    }

    res.status(200).json(bannerInfo.newsFlash);
  } catch (error) {
    console.error('Erreur lors de la récupération des news flash :', error);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};




exports.updateNewsFlash = async (req, res) => {
  const { id, text } = req.body;

  try {
    const bannerInfo = await InfoRedBanner.findOne();
    if (!bannerInfo) {
      return res.status(404).json({ message: 'Aucune bannière trouvée.' });
    }

    // Trouver la news flash par ID et la mettre à jour
    const newsFlash = bannerInfo.newsFlash.id(id);
    if (!newsFlash) {
      return res.status(404).json({ message: 'News flash non trouvée.' });
    }

    if (text) newsFlash.text = text;
    await bannerInfo.save();

    res.status(200).json({ message: 'News flash mise à jour avec succès.', data: newsFlash });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la news flash :', error);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};



exports.deleteNewsFlash = async (req, res) => {
  const { id } = req.params;

  try {
    const bannerInfo = await InfoRedBanner.findOne();
    if (!bannerInfo) {
      return res.status(404).json({ message: 'Aucune bannière trouvée.' });
    }

    // Supprimer la news flash par ID
    const newsFlash = bannerInfo.newsFlash.id(id);
    if (!newsFlash) {
      return res.status(404).json({ message: 'News flash non trouvée.' });
    }

    newsFlash.remove();
    await bannerInfo.save();

    res.status(200).json({ message: 'News flash supprimée avec succès.' });
  } catch (error) {
    console.error('Erreur lors de la suppression de la news flash :', error);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};
