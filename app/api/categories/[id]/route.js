import { Categories } from "@utils/models/Categories";
import mongoose from "mongoose";

export const GET = async (req, { params }) => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: "next_ecommerce",
        });
        const category = await Categories.findOne({ _id: params.id });
        if (category) {
            return new Response(JSON.stringify(category), { status: 200 });
        } else {
            return new Response("Category not found", { status: 404 });
        }
    } catch (error) {
        console.error("Error:", error);
        return new Response("Failed to fetch the category", {
            error: "Failed to fetch the category",
            status: 500,
        });
    }
};

export const DELETE = async (req, { params }) => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: "next_ecommerce",
        });
        const deletedCategory = await Categories.findOneAndDelete({
            _id: params.id,
        });
        if (deletedCategory) {
            return new Response({ status: 200 });
        } else {
            return new Response("Category not found", { status: 404 });
        }
    } catch (error) {
        console.error("Error:", error);
        return new Response("Failed to delete the category", {
            error: "Failed to delete the category",
            status: 500,
        });
    }
};
