const multer = require("multer");

const { v4: uuid } =
    require("uuid");



const storage =
    multer.diskStorage({


        destination(req, file, cb) {

            cb(
                null,
                "uploads/"
            );

        },



        filename(req, file, cb) {


            const name =

                uuid()

                +

                "-"

                +

                file.originalname;



            cb(
                null,
                name
            );


        }


    });



module.exports =
    multer({

        storage

    });