const express = require("express");
const albumController = require("../controllers/albumController"); // Fix the import statement
const { validateToken } = require("../authUtils");
const router = express.Router();

router.post("/getAllAlbums", albumController.getAllAlbums);
router.post("/getAlbumsByCreatorId", albumController.getAlbumsByCreatorId);
router.get("/getAlbumById/:id", albumController.getAlbumById);
router.post("/addAlbum", albumController.addAlbum);
router.put("/updateAlbum/:id", albumController.updateAlbum);
router.delete("/deleteAlbum/:id", albumController.deleteAlbum);

module.exports = router;
