import express from "express"
import cors from "cors"
//import cookieParser from "cookie-parser"
import bodyParser from 'body-parser';

const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
import userRouter from "./src/routes/user.route.js"
import taskRouter from "./src/routes/task.route.js" 
app.use("/api/v1/user",userRouter);
app.use("/api/v1/task",taskRouter);


export {app};