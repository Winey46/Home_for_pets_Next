import mongoose from "mongoose";
import * as process from "node:process";

export async function dbConnect() {
  try {
    return await mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING)

  } catch (error) {
    throw new Error(error.message || "Could not connect to the database")
  }
}