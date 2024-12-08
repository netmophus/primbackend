const mongoose = require('mongoose');

const infoRedBannerSchema = new mongoose.Schema({
  // Texte principal du RedBanner
  redBannerText: { 
    type: String, 
    required: true, 
    default: 'Annonce importante : Découvrez les dernières actualités ici !' 
  },

  newsFlash: [
    {
      text: { 
        type: String, 
        required: true 
      }, // Texte de l'annonce
      createdAt: { 
        type: Date, 
        default: Date.now 
      } // Date de création de l'annonce
    }
  ],
  // Numéros de téléphone pour InfoBanner
  phoneNumbers: {
    type: [String], // Tableau de numéros de téléphone
    default: ['+227 20 00 00 00', '+227 20 00 00 01']
  },
  // Adresse géographique pour InfoBanner
  address: {
    type: String,
    default: 'Avenue de la République, Niamey, Niger'
  },
  // Date de dernière mise à jour
  lastUpdated: { 
    type: Date, 
    default: Date.now 
  },
});

module.exports = mongoose.model('InfoRedBanner', infoRedBannerSchema);
