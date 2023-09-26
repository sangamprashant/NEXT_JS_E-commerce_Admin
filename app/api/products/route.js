import { Product } from "@utils/models/Product";
import mongoose from "mongoose";

export const POST = async (req, res) => {
  try {
    const { title, description, price,images,category,properties } = await req.json();
    
    // Connect to MongoDB using mongoose.connect
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "next_ecommerce",
    });

    // Create and save the product
    const product = new Product({
      title,
      description,
      price,
      images,
      category,
      properties,
    });
    await product.save();
    // Respond with the saved product
    return new Response(JSON.stringify(product), { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return new Response("Failed to fetch all products", { error:"Failed to fetch all products",status: 500 })
  }
};
export const GET = async (req, res) => {
  try {
    // Connect to MongoDB using mongoose.connect
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "next_ecommerce",
    });
    const  product = await Product.find({});
    return new Response(JSON.stringify(product), { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return new Response("Failed to fetch the products", { error:"Failed to fetch the products",status: 500 })
  }
};
export const PUT = async (req, res) => {
  const {images, title, description, price, _id,category,properties } = await req.json();
  console.log(category)
  try {
    // Connect to MongoDB using mongoose.connect
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "next_ecommerce",
    });
    await Product.findOneAndUpdate({_id},{title, description, price,images,category,properties})
    return new Response({ status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return new Response("Failed to fetch the products", { error:"Failed to fetch the products",status: 500 })
  }
};