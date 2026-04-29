const router = require("express").Router();
const controller = require("../controllers/gameController");

router.get("/photos", controller.listPhotos);
router.get("/photos/:photoId", controller.getPhoto);

router.post("/sessions/start", controller.startSession);
router.get("/sessions/:token", controller.getSession);

router.post("/guesses/validate", controller.validateGuess);
router.post("/sessions/finish", controller.finishSession);

router.get("/high-scores", controller.highScores);

module.exports = router;