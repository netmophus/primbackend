const Slider = require('../models/Slider');

// Récupérer tous les sliders
exports.getSliders = async (req, res) => {
  try {
    const sliders = await Slider.find();
    res.status(200).json(sliders);
  } catch (error) {
    console.error('Erreur lors de la récupération des sliders:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Récupérer un slider par ID
exports.getSliderById = async (req, res) => {
  try {
    const slider = await Slider.findById(req.params.id);
    if (!slider) {
      return res.status(404).json({ message: 'Slider introuvable' });
    }
    res.status(200).json(slider);
  } catch (error) {
    console.error('Erreur lors de la récupération du slider:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Créer un nouveau slider
// exports.createSlider = async (req, res) => {
//   try {
//     const { title, type, text } = req.body;
//     const src = type === 'image' ? req.file.path : req.body.src;

//     if (!title) {
//       return res.status(400).json({ message: "Le champ 'title' est requis." });
//     }

//     const newSlider = new Slider({
//       title,
//       slides: [
//         [
//           {
//             type,
//             src,
//             text,
//           },
//         ],
//       ],
//     });

//     await newSlider.save();
//     res.status(201).json({ message: 'Slider créé avec succès', data: newSlider });
//   } catch (error) {
//     console.error('Erreur lors de la création du slider:', error);
//     res.status(500).json({ message: 'Erreur serveur' });
//   }
// };


exports.createSlider = async (req, res) => {
  try {
    const { title, ...bodyData } = req.body;
    const files = req.files;

    // Préparation des slides
    const slides = [];

    for (let i = 0; i < Object.keys(bodyData).length / 2; i++) {
      const type = bodyData[`type${i}`];
      const text = bodyData[`text${i}`];
      const src = files[`image${i}`]
        ? files[`image${i}`][0].path.replace(/\\/g, '/')
        : bodyData[`src${i}`];

      slides.push({ type, src, text });
    }

    // Regrouper les slides par rangées de deux
    const groupedSlides = [];
    for (let i = 0; i < slides.length; i += 2) {
      const row = slides.slice(i, i + 2);
      if (row.length < 2) {
        return res.status(400).json({
          message: 'Chaque rangée doit contenir exactement deux éléments.',
        });
      }
      groupedSlides.push(row);
    }

    // Créer un nouveau slider
    const newSlider = new Slider({ slides: groupedSlides });
    await newSlider.save();

    res.status(201).json({ message: 'Slider créé avec succès', data: newSlider });
  } catch (error) {
    console.error('Erreur lors de la création du slider :', error);
    res.status(500).json({ message: error.message || 'Erreur serveur' });
  }
};



// Mettre à jour un slider



// exports.updateSlider = async (req, res) => {
//   try {
//     const { type, text } = req.body;

//     // Vérifie si un fichier a été uploadé
//     const fileSrc = req.file ? req.file.path.replace(/\\/g, '/') : req.body.src;

//     if (!fileSrc) {
//       return res.status(400).json({ message: "Le champ 'src' est obligatoire." });
//     }

//     const slides = [[{ type, src: fileSrc, text: text || '' }]];

//     const slider = await Slider.findByIdAndUpdate(
//       req.params.id,
//       { slides, lastUpdated: Date.now() },
//       { new: true }
//     );

//     if (!slider) {
//       return res.status(404).json({ message: 'Slider introuvable' });
//     }

//     res.status(200).json({
//       message: 'Slider mis à jour avec succès',
//       data: slider,
//     });
//   } catch (error) {
//     console.error('Erreur lors de la mise à jour du slider:', error.message);
//     res.status(500).json({ message: error.message || 'Erreur serveur.' });
//   }
// };

exports.updateSlider = async (req, res) => {
  try {
    console.log('Données reçues pour mise à jour :', req.body);
    console.log('Fichiers reçus :', req.files);

    const { type0, type1, text0, text1 } = req.body;

    const slides = [
      [
        {
          type: type0,
          src: req.files?.image0?.[0]?.path || req.body.src0,
          text: text0 || '',
        },
        {
          type: type1,
          src: req.files?.image1?.[0]?.path || req.body.src1,
          text: text1 || '',
        },
      ],
    ];

    const slider = await Slider.findByIdAndUpdate(
      req.params.id,
      { slides, lastUpdated: Date.now() },
      { new: true }
    );

    if (!slider) {
      return res.status(404).json({ message: 'Slider introuvable.' });
    }

    res.status(200).json({ message: 'Slider mis à jour avec succès.', data: slider });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du slider :', error.message);
    res.status(500).json({ message: error.message || 'Erreur serveur.' });
  }
};

// Supprimer un slider
exports.deleteSlider = async (req, res) => {
  try {
    const slider = await Slider.findByIdAndDelete(req.params.id);

    if (!slider) {
      return res.status(404).json({ message: 'Slider introuvable' });
    }

    res.status(200).json({ message: 'Slider supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression du slider:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};



// exports.getSlidersForFrontend = async (req, res) => {
//   try {
//     const sliders = await Slider.find();

//     // Transforme les chemins d'images pour s'assurer qu'ils utilisent des barres obliques
//     const formattedSliders = sliders.map((slider) => ({
//       ...slider._doc,
//       slides: slider.slides.map((row) =>
//         row.map((slide) => ({
//           ...slide,
//           src: slide.src.replace(/\\/g, '/'), // Remplace les barres inverses par des barres obliques
//         }))
//       ),
//     }));

//     res.status(200).json(formattedSliders);
//   } catch (error) {
//     console.error('Erreur lors de la récupération des sliders pour le frontend :', error);
//     res.status(500).json({ message: 'Erreur serveur.' });
//   }
// };


// exports.getSlidersForFrontend = async (req, res) => {
//   try {
//     const sliders = await Slider.find();

//     const formattedSliders = sliders.map((slider) => ({
//       ...slider._doc,
//       slides: slider.slides.map((row) =>
//         row.map((slide) => ({
//           ...slide,
//           src: slide.src.replace(/\\/g, '/'), // Remplace les barres inverses par des barres obliques
//         }))
//       ),
//     }));

//     res.status(200).json(formattedSliders);
//   } catch (error) {
//     console.error('Erreur lors de la récupération des sliders :', error);
//     res.status(500).json({ message: 'Erreur serveur.' });
//   }
// };



exports.getSlidersForFrontend = async (req, res) => {
  try {
    const sliders = await Slider.find();

    const formattedSliders = sliders.map((slider) => ({
      ...slider._doc,
      slides: slider.slides.map((row) =>
        row.map((slide) => ({
          type: slide.type,
          src: slide.src.replace(/\\/g, '/'), // Remplace les barres inverses par des barres obliques
          text: slide.text, // Assurez-vous d'inclure le texte dans chaque slide
        }))
      ),
    }));

    res.status(200).json(formattedSliders);
  } catch (error) {
    console.error('Erreur lors de la récupération des sliders :', error);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};
