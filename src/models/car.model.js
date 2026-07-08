const mongoose =
    require("mongoose");



const carSchema =
    new mongoose.Schema({


        licensePlate: {


            category: {
                type: String,
                required: true
            },


            number: {
                type: String,
                required: true
            },


            province: {
                type: String,
                required: true
            }

        },



        brand: {
            type: String,
            required: true
        },


        model: {
            type: String,
            required: true
        },



        color: String,


        year: Number,


        mileage: Number,



        status: {

            type: String,

            enum: [
                "ACTIVE",
                "REPAIR",
                "INACTIVE"
            ],

            default: "ACTIVE"

        },



        note: String,



        images: [

            {

                url: String,


                fileName: String,


                status: {

                    type: String,

                    default: "ACTIVE"

                }

            }

        ],



        deletedAt: {

            type: Date,

            default: null

        }



    }, {
        timestamps: true
    });



// กันทะเบียนซ้ำ

carSchema.index({

    "licensePlate.category": 1,

    "licensePlate.number": 1,

    "licensePlate.province": 1

}, {
    unique: true
});




module.exports =
    mongoose.model(
        "Car",
        carSchema
    );