exports.uploadImage =
    async (req, res) => {


        try {


            const images =
                req.files.map(file => {


                    return {

                        url:

                            `${req.protocol}://${req.get("host")}/uploads/${file.filename}`,



                        fileName:

                            file.filename,



                        size:

                            file.size,



                        status:

                            "ACTIVE"


                    };


                });




            return res.json({

                success: true,


                message:
                    "Upload success",


                data: images


            });



        } catch (err) {


            return res
                .status(500)
                .json({

                    success: false,


                    message:
                        err.message

                });

        }


    };