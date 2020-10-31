const { Router } = require("express");
const pets = require("../controllers/pets");

const auth = require("../middleware/auth.middleware");
const router = Router();
const admin = require("../controllers/admin");

router.put("/pets/:id", admin.editPet);

router.post("/add", pets.addPet);

router.delete("/pets/:id", admin.deletePet);

module.exports = router;
