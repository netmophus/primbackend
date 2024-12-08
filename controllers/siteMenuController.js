const SiteMenu = require('../models/SiteMenu');

// Récupérer tous les menus
exports.getAllMenus = async (req, res) => {
  try {
    const menus = await SiteMenu.find().sort({ order: 1 });
    res.status(200).json(menus);
  } catch (error) {
    console.error('Erreur lors de la récupération des menus:', error);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

// Récupérer un menu par ID
exports.getMenuById = async (req, res) => {
  try {
    const menu = await SiteMenu.findById(req.params.id);
    if (!menu) {
      return res.status(404).json({ message: 'Menu non trouvé.' });
    }
    res.status(200).json(menu);
  } catch (error) {
    console.error('Erreur lors de la récupération du menu:', error);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

// Créer un nouveau menu
exports.createMenu = async (req, res) => {
  try {
    const { title, path, subMenus, order, isActive } = req.body;
    const newMenu = new SiteMenu({ title, path, subMenus, order, isActive });
    await newMenu.save();
    res.status(201).json({ message: 'Menu créé avec succès.', data: newMenu });
  } catch (error) {
    console.error('Erreur lors de la création du menu:', error);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

// Mettre à jour un menu
exports.updateMenu = async (req, res) => {
  try {
    const { title, path, subMenus, order, isActive } = req.body;
    const menu = await SiteMenu.findByIdAndUpdate(
      req.params.id,
      { title, path, subMenus, order, isActive, lastUpdated: Date.now() },
      { new: true }
    );
    if (!menu) {
      return res.status(404).json({ message: 'Menu non trouvé.' });
    }
    res.status(200).json({ message: 'Menu mis à jour avec succès.', data: menu });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du menu:', error);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

// Supprimer un menu
exports.deleteMenu = async (req, res) => {
  try {
    const menu = await SiteMenu.findByIdAndDelete(req.params.id);
    if (!menu) {
      return res.status(404).json({ message: 'Menu non trouvé.' });
    }
    res.status(200).json({ message: 'Menu supprimé avec succès.' });
  } catch (error) {
    console.error('Erreur lors de la suppression du menu:', error);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};
