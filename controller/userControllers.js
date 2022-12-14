import User from "../model/users.js";
import { Validator } from "node-input-validator";
import bcriyt from "bcryptjs";
import express from "express";
import { passwordCompare } from "../utility/passCompare.js";
import { makeHash } from "../utility/hash.js";
import { validate } from "../utility/validate.js";
import { createToken } from "../utility/jwt.js";
import { accountActivationMail } from "../utility/mail.js";
import jwt from "jsonwebtoken";
import Validate from "../src/validate.js";








/*
 * show profile page
 */

export const profilePage = (req, res) => {
  res.render("profile");
};

//profile edit page
export const profileEditPage = (req,res) => {
  res.render('profilePage')
}

/**
 * login Page
 */
export const loginPage = (req, res) => {
  res.render("login");
};

/**
 * registar page
 */

export const registarPage = (req, res) => {
  res.render("modal");
};

//reset password otp
export const resetPasswordOtp = (req,res) => {
  res.render('reset')
}

/**
 * registar user
 */

export const registarUser = async (req, res) => {
  
  try {
    console.log(req.body);
    //get data
    const {first_name, last_name, email,password } = req.body;
    if(!first_name || !last_name || !email || !password ){
      validate("All fields are required!","/registar", req, res);
      
    }else{
      const user = await User.create({
        first_name,
        last_name,
        email,
        password : makeHash(password)
        
      });

      const token = createToken({ id: user._id }, 1000 * 60 * 60 * 24 * 365);
      const activation_link = `${process.env.APP_URL}:${process.env.PORT}/activate/${token}`;

      accountActivationMail(email, {
        first_name: first_name,
        last_name: last_name,
        link: activation_link,
      });
      
      validate("User registar successful","/registar", req, res);
      
    }
    

  } catch (error) {
    validate(error.message,"/registar", req, res);
  }
};

/**
 * registar user
 */

export const loginUser = async (req, res) => {

  
  try {
    //get from
    const { email, password } = req.body;

    if (!email) {
      validate("All fields are required!", "/login", req, res);
    } else {
      const userLogin = await User.find().where("email").equals(email);

      if (!userLogin[0]) {
        validate("email not exists", "/login", req, res);
      } else {
        if (!userLogin[0].isActive) {
          validate(`Please active your account`, "/login", req, res);
        } else {
          const userPass = bcriyt.compareSync(password, userLogin[0].password);
          if (!userPass) {
            validate("Password not match", "/login", req, res);
          } else {
            const token = createToken(
              { id: userLogin[0]._id },
              1000 * 60 * 60 * 24 * 365
            );
            req.session.user = userLogin[0];
            res.cookie("authToken", token);
            validate("User login successful", "/", req, res);
          }
        }
      }
    }
  } catch (error) {
    validate(error.message, "/registar", req, res);
  }
};

//logout user
export const logoutUser = (req, res) => {
  delete req.session.user;
  res.clearCookie("authToken");
  validate("logout successful", "/login", req, res);
};

//verification user
export const userVerification = async (req, res) => {
  try {
    res.render("verification");
  } catch (error) {
    console.log(error.message);
  }
};

//send Verification
export const sendVerification = async (req, res) => {
  try {
    //get from
    const { name, email, password } = req.body;

    const userData = await User.find();

    const token = createToken({ id: userData[0]._id }, 1000 * 60 * 60 * 24 * 3);
    const activation_link = `${process.env.APP_URL}:${process.env.PORT}/activate/${token}`;

    accountActivationMail(email, {
      name: name,
      link: activation_link,
    });

    validate("resend link, please check your email", "/verification", req, res);
  } catch (error) {
    validate(error.message, "/login", req, res);
  }
};

//account activation user
export const accountActivatinUser = async (req, res) => {
  try {
    const { token } = req.params;
    const tokenVerify = jwt.verify(token, process.env.SECRET_KEY);

    if (!tokenVerify) {
      validate("Invalid link", "/login", req, res);
    } else {
      const activationUser = await User.findOne({ _id: tokenVerify.id });

      if (activationUser.isActive) {
        validate("Account already activate ", "/login", req, res);
      } else {
        await User.findByIdAndUpdate(tokenVerify.id, {
          isActive: true,
        });
        validate(
          "Account activation successfull Log In now",
          "/login",
          req,
          res
        );
      }
    }
  } catch (error) {
    console.log(error.message);
  }
};

//profile photo page

export const profilePhotoPage = (req, res) => {
  res.render("photo");
};

//change password
export const changePassword = (req, res) => {
  res.render("password");
};



//edit
export const editPage = (req, res) => {
  res.render("edituserdata");
};




export const profilePhotoUpdate = async (req, res) => {

  try {
    
    await User.findByIdAndUpdate(req.session.user._id , {
      photo : req.file.filename
    });

    req.session.user.photo = req.file.filename;
    validate("Profile photo updated","/",req,res);
  } catch (error) {
    validate(error.message,"/profileEdit",req,res);

    
  }


};






//gallery
export const profileGalleryPage = (req, res) => {
  res.render("gallery");
};

export const profileGalleryUpdate = async (req, res) => {
  try {
    let file_arr = [];
    req.files.forEach((element) => {
      file_arr.push(element.filename);
      req.session.user.gellary.push(element.filename);
    });
    await User.findByIdAndUpdate(req.session.user._id, {
      $push: { gellary: { $each: file_arr } },
    });

    validate("Gallary upload successfull", "/gallery-update", req, res);
  } catch (error) {
    validate(error.message, "/gallery-update", req, res);
  }
};
//   try {
//     for (let i = 0; i < req.files.length; i++) {
//       await User.findByIdAndUpdate(req.session.user._id, {
//         $push: {
//           gallery: req.files[i].filename,
//         },
//       });
//     }

//     validate("gallery update successfull", "/gallery-update", req, res);
//   } catch (error) {
//     validate(error.message, "/gallery-update", req, res);
//   }
// }

//edit==========================================================
export const editPageUpdate = async (req, res) => {
  try {
    console.log(req.body);
    const { first_name, last_name, email } = req.body;

    const user = req.session.user;
    const userUpdateData = await User.findByIdAndUpdate(
      user._id,

      {
       
          first_name: first_name,
          last_name : last_name,
          email: email,
        
      }
    );
    res.clearCookie("authToken");
    req.session.user = userUpdateData;
    validate("profile updated successfull", "/profile-change", req, res);
  } catch (error) {
    validate(error.message, "/profile-change", req, res);
  }
};

//change password=================================================
export const changeOldPassword = async (req, res) => {
  try {
    const { old_password, new_password, conf_password } = req.body;
    if (!old_password || !new_password || !conf_password) {
      validate("All fields are required!", "/pasword", req, res);
    } 
    
    else {
      if (new_password == conf_password) {
        const user = await User.findByIdAndUpdate(req.session.user._id)
        const check_pass = await passwordCompare(old_password, user.password);

        if (check_pass) {
          const pass = await User.findByIdAndUpdate(user._id, {
            password: makeHash(new_password),
          });
        }
       
        validate("password change successfull", "/pasword", req, res);
      }
    }

    
  //  res.clearCookie("authToken");
 
    
  } catch (error) {
    validate(error.message, "/pasword", req, res);
  }
};

//find friends========================================================
export const findFriends = async (req, res) => {

  
try {
  const allFriends = await User.find().where('email').ne(req.session.user.email)
  console.log(allFriends);
  res.render("findFriends", {
    allFriends,
  });
  
} catch (error) {
  validate(error.message, "/find-friends", req, res);
  
}

//  try {
//   const allFriends = await User.find().where('email').ne(req.session.user.email)
//   res.render("findFriends", {
//     allFriends,
//   });
//  } catch (error) {
//   validate(error.message, "/find-friends", req, res);
  
//  }
};


//single friends page
export const singleFriendsPage = async(req,res) => {
  try {

    const { id } = req.params;
    const singleUser = await User.findById(id)
    res.render("single", {
      singleUser,
    });
    
  } catch (error) {
    validate(error.message, "/find-friends", req, res);
    
  }
}

//follow user
export const followUser = async(req,res) => {
  try {

    const { id } = req.params;
    const follow = await User.findByIdAndUpdate(req.session.user._id, {
      $push : {
        following : id
      }
    }) ;

    await User.findByIdAndUpdate(
      { _id: id },
      {
        $push: {
          followers: req.session.user._id,
        },
      }
    );
    


    req.session.user.following.push(id);
    validate('following successfully', "/find-friends", req, res)
    
  } catch (error) {
    validate(error.message, "/", req, res);
    
  }
}


//unfollow user
export const unfollowUser = async(req,res) => {
  try {

    const { id } = req.params;
    const unfollow = await User.findByIdAndUpdate(req.session.user._id, {
      $pull : {
        following : id,
      },
    }); 
    await User.findByIdAndUpdate(req.session.user._id, {
      $pull: {
        following: id,
      },
    });


    let updat_list = req.session.user.following.filter((data) => data != id);
    req.session.user.following = updat_list;
    validate('unfollow successfully', "/find-friends", req, res)
    
  } catch (error) {
    validate(error.message, "/", req, res);
    
  }
}

//forget
export const forgetAccount = async(req,res) => {
  res.render('forgat')
}

export const forgetAccountpost = async(req,res) => {
 
 try {

  const {first_name,last_name,email} = req.body;
  const user = await User.find().where('email').equals(email);
  
  if(email == ''){
   
   validate('please Enter your email!', "/forgat", req, res)
 
  }else if(!user[0]){
  
   validate('user not found!', "/forgat", req, res)
   
   
 
 
  }else{
   if(user[0]){
    
    
    
     const otp  = Math.floor(Math.random() * 10000);
     if(!Validate.isNumber(user.email)){
      validate('otp code invalid', "/reset", req, res)

     };
     const token = createToken({ id: user._id }, 1000 * 60 * 60 * 24 * 365);
     const activation_link = `${process.env.APP_URL}:${process.env.PORT}/activate/${token}`;
 
     accountActivationMail(email, {
       first_name: first_name,
       last_name: last_name,
       otp  : otp,
       link: activation_link,
     });
     validate('Please check your email for otp-code', "/reset", req, res);
    }
 
      
  }
  
 } catch (error) {
  validate(error.message ,"/forgat", req, res);

  
 }

 
};


export const continueHome = async (req,res) => {

  const otp  = Math.floor(Math.random() * 10000);
  const otpReset = await User.find().where('email').equals(email);

  if(!otpReset || otpReset == '' ){
    validate('Please enter your otp code via email', "/reset", req, res);

  }
  if(otp != otpReset.email){
    validate('', "/", req, res);

  }

};

//pass
export const passwordPage = (req,res) => {
  res.render('password')
}


//password changed
export const passwordAlreadyChanged = (req,res) => {
  res.render('changedPassword')
};



//create page
export const createPage = (req,res) => {
  res.render('create');
}



//create post 
export const createPost = async(req,res) => {
try {
 

  const {aname,aphoto,pcontent,pphoto} = req.body;
  if(!aname || !aphoto || !pcontent ){
    validate('All fields are required!', "/create", req, res);

  };

  const user = await User.findByIdAndUpdate(req.session.user._id, {
    name : aname,
    aphoto : aphoto,
    content : pcontent,
    photo : pphoto

  });
  validate('Added your post in profile', "/", req, res);

  
} catch (error) {
  validate(error.message, "/create", req, res);
  
}
 

 


};



