import { Categories } from "@utils/models/Categories";
import mongoose from "mongoose";

export const POST = async (req, res) => {
  try {
    const { name, parentCategory, properties } = await req.json();
    // Connect to MongoDB using mongoose.connect
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "next_ecommerce",
    });

    // Create and save the product
    const Category = new Categories({
        name,
        parent:parentCategory||undefined,
        properties,
    });
    await Category.save();
    // Respond with the saved product
    return new Response(JSON.stringify(Category), { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return new Response("Failed to save the category", { error:"Failed to save the category",status: 500 })
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
    const categories = await Categories.find({}).populate("parent");
    return new Response(JSON.stringify(categories), { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return new Response("Failed to fetch the Category", { error:"Failed to fetch the Category",status: 500 })
  }
};
export const PUT = async (req, res) => {
  const { name, parentCategory, id, properties } = await req.json();
  try {
    // Connect to MongoDB using mongoose.connect
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "next_ecommerce",
    });
    // Define the update object based on the presence of parentCategory
    const updateObject = parentCategory ? { name, parent: parentCategory,properties } : { name, $unset: { parent: "" },properties };
    await Categories.findOneAndUpdate({ _id: id }, updateObject);
    return new Response({ status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return new Response("Failed to update the category", { error: "Failed to update the category", status: 500 });
  }
};