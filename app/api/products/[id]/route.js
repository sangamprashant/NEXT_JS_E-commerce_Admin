import { Product } from "@utils/models/Product";
import mongoose from "mongoose";

export const GET = async (req,{params }) => {
    try {
      await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: "next_ecommerce",
      });
      const  product = await Product.findOne({_id:params.id});
      return new Response(JSON.stringify(product), { status: 200 });
    } catch (error) {
      console.error("Error:", error);
      return new Response("Failed to fetch the products", { error:"Failed to fetch the products",status: 500 })
    }
  };

  export const DELETE = async (req,{params }) => {
    try {
      await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: "next_ecommerce",
      });
       await Product.findOneAndDelete({_id:params.id});
      return new Response({ status: 200 });
    } catch (error) {
      console.error("Error:", error);
      return new Response("Failed to fetch the products", { error:"Failed to fetch the products",status: 500 })
    }
  };