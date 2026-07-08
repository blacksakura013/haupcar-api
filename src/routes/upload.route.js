const router =
    require("express").Router();


const upload =
    require("../middleware/upload");


const controller =
    require("../controllers/upload.controller");



router.post(

    "/images",


    upload.array(
        "images",
        10
    ),


    controller.uploadImage

);



module.exports =
    router;