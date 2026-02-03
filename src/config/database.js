const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://namastenode:uExwFCpySNUdfEd6@namastenode.cfifddn.mongodb.net/devTinder",
  );
};

module.exports = connectDB;
