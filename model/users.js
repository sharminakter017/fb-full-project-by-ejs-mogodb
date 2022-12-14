import mongoose from 'mongoose';


//create shcema
const userSchema = mongoose.Schema({
    first_name : {
        type : String,
        trim : true,  
    },

    last_name : {
        type : String,
        trim : true,  
    },
        
    username : {
        type : String,
        trim : true

    },
    email : {

        type : String,
        
        trim : true
    },
   password : {

        type : String,
        trim : true
    },
    age : {
        type : String,
        trim : true

    },
    skill : {
        type : String,
        trim : true
    },
    gender : {
        type : String,
        enum : ["Male" , "Female"],
        
    },

    location : {
        type : String,
        trim : true
    },

    photo : {
        type : String,
        trim : true,
        
    },
    content : {
        type : String,
        trim : true,
        
    },
    // aphoto : {
    //     type : String,
    //     trim : true,
    // },
    name : {
        type : String,
        trim : true,
    },
    title : {
        type : String,
        trim : true,
        
    },
    // pphoto : {
    //     type : String,
    //     trim : true,
        
    // },

    gellary : {
        type : [String],
        trim : true
    },
    followers: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
      },
      following: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
      },
    accessToken : {
        type : String,
        trim : true
    },
    otp : {
        type : String,
    },

    isActive : {
        type : Boolean,
        default : false,

    },
    isverifyed : {
        type : Boolean,
        default : false
    },

    isAdmin : {
        type : Boolean,
        default : true,

    },
    
    phone : String
},{
    timestamps : true
});



//exporting
export default  mongoose.model('user', userSchema)