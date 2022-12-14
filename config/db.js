import mongoose from 'mongoose';


//mongoodb connection 
export const mongodbConnection = async() => {

    try {

        const mongoConnect = await mongoose.connect(  process.env.MONGO_URI);

        console.log('mongoDBConnection is successfully Done'.bgMagenta.red);
        
    } catch (error) {

        console.log(`${error.message}`.bgRed.black);
        
    }



}