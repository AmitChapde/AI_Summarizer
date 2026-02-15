import mongoose from "mongoose";
import app from "./app";
import { env } from "./config/env";

async function start() {
  try {
    await mongoose.connect(env.MONGO_URI);
    console.log("Mongo connected");

    app.listen(env.PORT, () => {
      console.log(`Server running on ${env.PORT}`);
    });
  } catch (err) {
    console.error("Startup error", err);
    process.exit(1);
  }
}

start();
