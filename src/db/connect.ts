import mongoose from "mongoose";

// const options: mongoose.ConnectOptions = {
//     uri_decode_auth: true 
// } 

export const connectDB = async(url : string)  => {
return mongoose.connect(url) 
}

