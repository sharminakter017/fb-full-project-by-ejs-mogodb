import express from 'express';
import  dotenv  from "dotenv";
import colors from "colors";
import session from 'express-session';
import ejs  from "ejs";
import  expressLayouts  from "express-ejs-layouts";
import { mongodbConnection } from './config/db.js';
import userRoute from './routes/user.js'
import { localMiddleware } from './middleware/localMiddlewares.js';
import cookieParser from 'cookie-parser';






//express init
const app = express();

//environment variables
dotenv.config();
const PORT = process.env.PORT || 2000;

//ejs init
app.set('view engine', 'ejs')
app.set('layout', 'layouts/app')

//express session
app.use(
    session({
        secret : 'I love mern',
        saveUninitialized : true,
        resave : false
    })
);




//static
app.use('/public',express.static('public'))






//data manage 
app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(expressLayouts);
//cookie parser
app.use(cookieParser())



//localMiddleware
app.use(localMiddleware)




//routes
app.use('/',userRoute)






//server listen
app.listen(PORT,(req,res) => {
    mongodbConnection()
   
    console.log(`server is running port of ${PORT}`.bgGreen.black);
})