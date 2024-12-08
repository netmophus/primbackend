const checkPermission = (requiredPermission) => {
  return (req, res, next) => {
    // Vérifier si l'utilisateur a les permissions requises
    if (!req.user || !req.user.permissions || !req.user.permissions.includes(requiredPermission)) {
      return res.status(403).json({ message: 'Accès refusé, permission insuffisante.' });
    }
    next(); // Si l'utilisateur a la permission, passer à la route suivante
  };
};

module.exports = checkPermission;
