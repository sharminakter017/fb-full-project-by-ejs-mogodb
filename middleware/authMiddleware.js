import { validate } from "../utility/validate.js";
import  jwt  from "jsonwebtoken"


export const authMiddleware = (req,res,next ) => {

    const token = req.cookies.authToken;

    if(token){
        validate('You already singing', '/',req,res)
    }else{

        next()
       
    }
    console.log(token);
    
}


