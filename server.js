const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes'); // Assurez-vous que le chemin est correct
const inforedbannerRoutes = require('./routes/inforedbannerRoutes');
const siteMenuRoutes = require('./routes/siteMenuRoutes'); // Import des routes des menus
const sliderRoutes = require('./routes/sliderRoutes'); // Routes pour le slider
const infoOfficielleRoutes = require('./routes/infoOfficielleRoutes');
const categoryRoutes = require('./routes/medias/categoryRoutes');
const mediaRoutes = require('./routes/medias/mediaRoutes');
const projectRoutes = require('./routes/projectRoutes');
const path = require('path');
const ministreRoutes = require('./routes/ministreRoutes'); // Import des routes des ministres
require('dotenv').config();

const app = express();

// Middleware CORS pour permettre les requêtes du frontend
app.use(cors({
 // origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:5173'], // Ajoutez toutes les URLs autorisées
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  origin: '*', // Ajustez selon vos besoins
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
  
}));


// Middleware pour rendre les fichiers du dossier 'uploads' accessibles
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Middleware pour analyser le corps des requêtes
app.use(express.json());

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connecté à MongoDB'))
  .catch((err) => console.error('Erreur de connexion MongoDB:', err));

// Routes pour l'authentification
app.use('/auth', authRoutes);
// Routes pour gérer InfoRedBanner
app.use('/inforedbanner', inforedbannerRoutes);


// Routes pour la gestion des menus
app.use('/site-menu', siteMenuRoutes);

app.use('/sliders', sliderRoutes); // Utilisation des routes sliders

app.use('/infoofficielle', infoOfficielleRoutes);

// Routes
app.use('/categories', categoryRoutes);
app.use('/media', mediaRoutes);
// app.use('/infoofficielle', (req, res, next) => {
//   console.log(`[SERVER] Requête reçue sur /infoofficielle: ${req.method} ${req.originalUrl}`);
//   next();
// }, infoOfficielleRoutes);

// Utiliser les routes
app.use('/project', projectRoutes);


app.use('/ministre', ministreRoutes);  // Utilisation des routes des ministres
// Test de route de base
app.get('/', (req, res) => {
  res.send('Bienvenue dans le backend');
});

// Démarrer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
