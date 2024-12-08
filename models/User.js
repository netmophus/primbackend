const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Définition du schéma de l'utilisateur
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    default: 'user', // Par exemple 'user', 'admin'
    enum: ['user', 'admin', 'superadmin'], // Liste des rôles possibles
  },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  isActive: { type: Boolean, default: true }, // Champ pour savoir si l'utilisateur est actif
  permissions: {
    type: [String], // Tableau de chaînes de caractères pour les permissions
    default: ['read'], // Permissions par défaut
  },
  createdAt: { type: Date, default: Date.now },
});

// Hachage du mot de passe avant de sauvegarder
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Méthode pour comparer les mots de passe
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Exporter le modèle
module.exports = mongoose.model('User', userSchema);
