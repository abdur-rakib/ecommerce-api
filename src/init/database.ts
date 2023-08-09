import { Connection } from "mongoose";
import { vars } from "../../config/vars";

const mongoose = require("mongoose");

const { mongo } = vars;

export const initDB = (): void => {
  // Connect to the database
  mongoose.connect(mongo.uri);

  // Connection events
  const db: Connection = mongoose.connection;

  db.on("error", (error) => {
    console.error("Connection error:", error);
  });

  db.once("open", () => {
    console.log("Connected to the database");
  });

  db.on("disconnecting", () => {
    console.log("Disconnecting from the database");
  });

  db.on("disconnected", () => {
    console.log("Disconnected from the database");
  });
};
