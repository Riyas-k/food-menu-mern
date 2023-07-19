const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin-controller");

//admin login related

router.get("/", adminController.getUsers);
router.post("/login", adminController.postAdmin);


//admin menu related routes

router.get('/view-all-menu',adminController.viewAllMenu);
router.post('/menu-post',adminController.postMenu);
router.put('/edit-menu/:menuId',adminController.editMenu);
router.delete('/delete-menu/:menuId',adminController.deleteMenu);

router.post('/search-menu',adminController.searchMenu)

module.exports = router;
