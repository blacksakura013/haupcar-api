const Car =
    require("../models/car.model");



// CREATE

exports.create =
    async (req, res) => {


        try {


            const car =
                await Car.create(
                    req.body
                );



            res.status(201)
                .json({

                    success: true,

                    data: car

                });



        } catch (err) {


            res.status(400)
                .json({

                    success: false,

                    message: err.message

                });


        }


    };




// LIST LOAD MORE

exports.findAll =
    async (req, res) => {


        const page =
            Number(req.query.page)
            || 1;



        const limit =
            Number(req.query.limit)
            || 10;



        const skip =
            (page - 1) * limit;



        let filter = {

            deletedAt: null

        };



        // Search

        if (req.query.search) {


            filter.$or = [


                {
                    brand:
                    {
                        $regex: req.query.search,
                        $options: "i"
                    }
                },


                {
                    model:
                    {
                        $regex: req.query.search,
                        $options: "i"
                    }
                },


                {
                    "licensePlate.number":
                    {
                        $regex: req.query.search
                    }
                }


            ];


        }



        const cars =
            await Car.find(filter)

                .skip(skip)

                .limit(limit)

                .sort({

                    createdAt: -1

                });




        const total =
            await Car.countDocuments(
                filter
            );




        res.json({


            success: true,


            data: cars,



            pagination: {


                page,


                limit,


                total,


                hasMore:

                    page * limit < total


            }


        });


    };




// DETAIL

exports.findOne =
    async (req, res) => {


        const car =
            await Car.findById(
                req.params.id
            );



        res.json({

            success: true,

            data: car

        });

    };




// UPDATE


exports.update =
    async (req, res) => {


        const car =
            await Car.findByIdAndUpdate(

                req.params.id,


                req.body,


                {
                    new: true
                }

            );



        res.json({

            success: true,

            data: car

        });


    };




// DELETE


exports.remove =
    async (req, res) => {


        await Car.findByIdAndUpdate(

            req.params.id,

            {
                deletedAt: new Date()
            }

        );



        res.json({

            success: true,

            message: "Deleted"

        });



    };