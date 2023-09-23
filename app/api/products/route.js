import { Product } from "@utils/models/Product";
import mongoose from "mongoose";

export const POST = async (req, res) => {
  try {
    const { title, description, price } = await req.json();
    
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
    });
    await product.save();
console.log(product)
    // Respond with the saved product
    return new Response(JSON.stringify(product), { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
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
    let product;
    if(req.query?.id){
      product = await Product.findOne({_id:req.query?.id});
    }else{
      product = await Product.find({});
    }
    return new Response(JSON.stringify(product), { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};