import jwt from "jsonwebtoken"
import { validate } from "../utility/validate.js";
import User from '../model/users.js'


export const authRedirectMiddleware = async(req,res,next ) => {

    try {

      const token = req.cookies.authToken;

    if(token){
     
      const tokenCheck =  jwt.verify(token,process.env.SECRET_KEY)

      if( tokenCheck ){

        const userData = await User.findById(tokenCheck.id)
        if(userData){
          next()

        }else{
          delete req.session.user;
          res.clearCookie('authToken');
          validate('Please Login!', '/login',req,res)

        }



        
      }

      console.log(tokenCheck);
      


       
    }else{
      delete req.session.user;
      res.clearCookie('authToken');
      
        validate('Please Sign Up!', '/login',req,res)
    }
    
      
    } catch (error) {
      delete req.session.user;
      res.clearCookie('authToken');
     
      validate('Invalid token', '/login',req,res)

      
    }
    
}