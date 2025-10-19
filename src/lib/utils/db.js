import mongoose from "mongoose";

// get the mongodb uri from the environment variables
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(" رشته اتصال به دیتابیس یافت نشد");
}

// create a cached connection to the database
let cached = global.mongoose;

// if the cached connection is not established, create a new connection
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

// connect to the database
async function connectToDb() {
  // if the connection is already established, return the cached connection
  if (cached.conn) {
    return cached.conn;
  }
  // if the connection is not established, create a new connection
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    // connect to the database
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  // try to connect to the database
  try {
    cached.conn = await cached.promise;
    // if the connection is successful, return the connection
  } catch (e) {
    // if the connection is not successful, throw an error
    cached.promise = null;
    throw e;
  }
  return cached.conn;
}

export default connectToDb;
