require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

const connectDB =
    require("./config/database");


// ===================================
// APP INIT
// ===================================

const app = express();



// ===================================
// ENV
// ===================================

const PORT =
    process.env.PORT || 5000;


const NODE_ENV =
    process.env.NODE_ENV || "development";



// ===================================
// DATABASE
// ===================================

connectDB();



// ===================================
// SECURITY
// ===================================


app.use(
    helmet({
        crossOriginResourcePolicy: false
    })
);



// CORS

app.use(

    cors({

        origin:

            process.env.CLIENT_URL
            ||

            "*",


        methods: [

            "GET",

            "POST",

            "PUT",

            "PATCH",

            "DELETE"

        ],



        allowedHeaders: [

            "Content-Type",

            "Authorization"

        ]

    })

);



// ===================================
// RATE LIMIT
// ===================================


const limiter =
    rateLimit({

        windowMs:
            15 * 60 * 1000,


        max:
            200,


        standardHeaders: true,


        legacyHeaders: false,


        message: {


            success: false,


            error: {


                code:
                    "TOO_MANY_REQUEST",


                message:
                    "Too many requests"


            }

        }

    });



app.use(
    limiter
);




// ===================================
// BODY PARSER
// ===================================


app.use(

    express.json({

        limit: "10mb"

    })

);



app.use(

    express.urlencoded({

        extended: true,


        limit: "10mb"

    })

);



// ===================================
// LOGGER
// ===================================


if (
    NODE_ENV
    ===
    "development"
) {

    app.use(
        morgan("dev")
    );

}




// ===================================
// STATIC FILE
// ===================================


app.use(

    "/uploads",


    express.static(

        path.join(

            process.cwd(),

            "uploads"

        )

    )

);




// ===================================
// HEALTH CHECK
// ===================================


app.get(

    "/health",


    (req, res) => {


        res.status(200)
            .json({


                success: true,


                service:

                    "haupcar-api",



                version:

                    "1.0.0",



                status:

                    "running",



                environment:

                    NODE_ENV,



                time:

                    new Date()


            });


    }

);




// ===================================
// API VERSION
// ===================================


app.use(

    "/api/v1",


    require(

        "./routes"

    )

);




// ===================================
// 404 NOT FOUND
// ===================================


app.use(

    (req, res) => {


        res.status(404)
            .json({


                success: false,


                error: {


                    code:

                        "ROUTE_NOT_FOUND",



                    message:

                        `Route ${req.originalUrl} not found`

                }


            });


    }

);




// ===================================
// GLOBAL ERROR HANDLER
// ===================================


app.use(

    (

        err,

        req,

        res,

        next

    ) => {


        console.error(
            err
        );



        res.status(

            err.statusCode

            ||

            500

        )
            .json({



                success: false,



                error: {


                    code:


                        err.code

                        ||

                        "SERVER_ERROR",




                    message:


                        err.message


                        ||

                        "Internal Server Error"


                }



            });


    }

);




// ===================================
// START SERVER
// ===================================


const server =
    app.listen(

        PORT,


        () => {


            console.log(`

================================

🚗 HaupCar API Started

URL:
http://localhost:${PORT}


API:
http://localhost:${PORT}/api/v1


Health:
http://localhost:${PORT}/health


ENV:
${NODE_ENV}


================================

`);

        }

    );




// ===================================
// GRACEFUL SHUTDOWN
// ===================================


process.on(

    "SIGINT",


    () => {


        console.log(
            "Stopping server..."
        );



        server.close(

            () => {


                console.log(

                    "Server closed"

                );



                process.exit(0);


            }

        );


    }

);




// ===================================
// UNHANDLED ERROR
// ===================================


process.on(

    "unhandledRejection",


    (err) => {


        console.error(

            "Unhandled Rejection:",

            err.message

        );



        server.close(() => {


            process.exit(1);


        });


    }

);