import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env"
  );
}

let cached = global.mongoose;
// Check if the global variable(mongoose-conneect/promise) is already defined
if (!cached) {
  cached = global.mongoose = {
    conn: null,
    promise: null,
  };
}

export async function connectToDatabase(){
    //if connected
    if(cached.conn){
        return cached.conn
    }
    //if not promise on way,crete new promise to connect
    if(!cached.promise){
const options={
    bufferCommands:true, // Enable buffering of commands
    maxPoolSize: 10, // no of connections in the database pool
}

//datase connection

        mongoose.connect(MONGODB_URI,options)
        .then(()=>mongoose.connection)

    }
    try{
cached.conn=await cached.promise
    }
    catch(error){
        cached.promise = null; // Reset the promise on error
console.error("Failed to connect to MongoDB", error);
    }
    return cached.conn;
}