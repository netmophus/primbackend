// const express = require('express');
// const router = express.Router();
// const authenticate = require('../middlewares/authMiddleware');
// const upload = require('../middlewares/infoOfficielleUploadMiddleware');
// const {
//   createOnglet,
//   getOnglets,
//   updateOnglet,
//   deleteOnglet,
//   getContenus,
//   getContenusByTabId,
//   createContenu,
//   updateContenu,
//   deleteContenu,
// } = require('../controllers/infoOfficielleController111');

// // Routes pour les onglets
// router.get('/onglets', authenticate, getOnglets);
// router.post('/onglets', authenticate, createOnglet);
// router.put('/onglets/:id', authenticate, updateOnglet);
// router.delete('/onglets/:id', authenticate, deleteOnglet);

// // Routes pour les contenus
// router.get('/contenus', authenticate, getContenus);
// router.get('/contenus/:tabId', authenticate, getContenusByTabId);
// router.post('/contenus', authenticate, upload.single('image'), createContenu);
// router.put('/contenus/:id', authenticate, upload.single('image'), updateContenu);
// router.delete('/contenus/:id', authenticate, deleteContenu);

// module.exports = router;




const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authMiddleware');

const uploadCarte = require('../middlewares/infoOfficielleUploadCarteMiddleware');
const uploadArticle = require('../middlewares/articleUploadMiddleware');


// Controllers
const {
  createOnglet,
  getOnglets,
  updateOnglet,
  deleteOnglet,
  getOngletsFront
} = require('../controllers/infoOfficielle/ongletController');

const {
  createCard,
  getCardsByTabId,
  updateCard,
  deleteCard,
  getCardsFront
} = require('../controllers/infoOfficielle/cardController');

const {
  createArticle,
  getArticlesByCardId,
  updateArticle,
  deleteArticle,
  getArticlesFront,
 
} = require('../controllers/infoOfficielle/articleController');

// **Routes pour les onglets**
router.get('/onglets', authenticate, getOnglets); // Récupérer tous les onglets
router.post('/onglets', authenticate, createOnglet); // Créer un nouvel onglet
router.put('/onglets/:id', authenticate, updateOnglet); // Mettre à jour un onglet
router.delete('/onglets/:id', authenticate, deleteOnglet); // Supprimer un onglet

// Routes pour les onglets côté frontend
router.get('/front/onglets', getOngletsFront); // Récupérer les onglets pour le frontend

// **Routes pour les cartes**
router.get('/cards/:tabId', authenticate, getCardsByTabId); // Récupérer les cartes d'un onglet
//router.post('/cards', authenticate, upload.single('image'), createCard); // Créer une carte
//router.put('/cards/:id', authenticate, upload.single('image'), updateCard); // Mettre à jour une carte
router.post('/cards', authenticate, uploadCarte.single('image'), createCard);

// Routes pour les cartes côté frontend
router.get('/front/cards/:tabId', getCardsFront); // Récupérer les cartes pour un onglet donné
router.put('/cards/:id', authenticate, uploadCarte.single('image'), updateCard);

router.delete('/cards/:id', authenticate, deleteCard); // Supprimer une carte




// **Routes pour les articles**
router.get('/articles/:cardId', authenticate, getArticlesByCardId); // Récupérer les articles d'une carte
router.post('/articles', authenticate, uploadArticle.array('files', 10), createArticle); // Créer un article avec fichiers
router.put('/articles/:id', authenticate, uploadArticle.array('files', 10), updateArticle); // Mettre à jour un article avec fichiers
router.delete('/articles/:id', authenticate, deleteArticle); // Supprimer un article

// Route pour récupérer les articles pour le frontend
router.get('/front/articles/:cardId', getArticlesFront);



module.exports = router;
