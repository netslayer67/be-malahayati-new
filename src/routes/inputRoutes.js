const router = require("express").Router();
const InputNasabah = require("../controllers/inputNasbaahController");

router.get("/get-inputs", InputNasabah.getInputs);
router.post("/create-input", InputNasabah.createInput);
router.get("/get-input/:id", InputNasabah.getDetailInput);

module.exports = router;
