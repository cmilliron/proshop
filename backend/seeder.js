import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModels.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const resetDatabase = async () => {
  await Order.deleteMany();
  await Product.deleteMany();
  await User.deleteMany();
};

const importData = async () => {
  try {
    await resetDatabase();

    const createdUsers = await User.insertMany(users);
    console.log(createdUsers);

    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((product) => {
      const newProduct = { ...product, user: adminUser };
      const { _id, ...forDB } = newProduct;
      return { ...forDB };
    });

    console.log(sampleProducts);

    await Product.insertMany(sampleProducts);

    console.log("Data Imported".green.inverse);
    process.exit();
  } catch (error) {
    console.log(`Error: ${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    resetDatabase();

    console.log(`Data Destroyed. Database Empty.`.green.inverse);
    process.exit(0);
  } catch (error) {
    console.log(`Error: ${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
