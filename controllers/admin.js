const Pet = require("../models/Pet");

exports.editPet = async (req, res) => {
  try {
    const {
      id,
      name,
      sex,
      type,
      breed,
      birthday,
      age,
      description,
      imageUrl,
    } = req.body;

    const pet = await Pet.findByPk(id);
    pet.name = name || "Барбос";
    pet.sex = sex || "M";
    pet.type = type || "C";
    pet.breed = breed || null;
    pet.birthday = birthday || null;
    pet.age = age || null;
    pet.description = description || null;
    pet.imageUrl = imageUrl || null;

    pet.save();
    res.json(pet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deletePet = async (req, res) => {
  try {
    const { id } = req.body;

    const pet = await Pet.findByPk(id);
    if (pet) {
      pet.destroy();
    }

    res.redirect("/pets");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
