import express from "express"
import cors from "cors"
//import cookieParser from "cookie-parser"
import bodyParser from 'body-parser';

const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
import userRouter from "./src/routes/user.route.js"


app.use("/api/v1/user",userRouter);


export {app};