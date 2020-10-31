const { Router } = require("express");
const auth = require("../middleware/auth.middleware");

const router = Router();
const pets = require("../controllers/pets");

router.get("/", pets.getAllPets);
router.post("/add", pets.addPet);

router.get("/:id", pets.getPetById);

module.exports = router;
