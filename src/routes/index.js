const router = require("express").Router();


const carRoute =
require("./car.route");


const uploadRoute =
require("./upload.route");




// =======================
// API ROUTES
// =======================


router.use(
    "/cars",
    carRoute
);



router.use(
    "/uploads",
    uploadRoute
);



module.exports = router;