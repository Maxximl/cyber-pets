const Pet = require("../models/Pet");

exports.addPet = async (req, res) => {
  try {
    const {
      name,
      sex,
      type,
      breed,
      birthday = null,
      age,
      description,
      imageUrl = null,
      writed = false,
      hasOwner = false,
    } = req.body;

    Pet.create({
      name: name || "name",
      sex: sex || "sex",
      type: type || "type",
      breed: breed || "breed",
      age: age || "age",
      birthday: birthday || "null",
      description: description || "null",
      imageUrl: imageUrl || "null",
      writed: false,
      hasOwner: false,
    });
    res.redirect("/api/pets");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllPets = async (req, res) => {
  try {
    const pets = await Pet.findAll();
    res.json(pets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPetById = async (req, res) => {
  try {
    const petId = req.params.id;
    const pet = await Pet.findAll({ where: { id: petId } });
    res.json(pet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
