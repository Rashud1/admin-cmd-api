import dotenv from "dotenv"
dotenv.config();
import express from "express";
const app = express()
import helmet from "helmet";
import morgan from "morgan";

const PORT = process.env.PORT || 8000;


// Connect MongoDB
import mongoClient from './config/db.js'
mongoClient();


// load routers
import userRouter from './routers/userRouter.js';

// use routers
app.use("/api/v1/user", userRouter);

// middelwares
app.use(helmet());

app.use("/", (req, res) => {
    res.json({message: "hello world"});
});

app.use(morgan("tiny"));
app.use(express.urlencoded());
app.use(express.json());


app.listen(PORT, (error) => {
    if(error){
        return console.log(error)

    }
    console.log (`Server is running at http://localhost:${PORT}`)
    
});


