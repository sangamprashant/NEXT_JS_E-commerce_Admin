const { Schema, model, models, default: mongoose } = require("mongoose");

// Schema for Category
const CategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    parent: { type: mongoose.Schema.Types.ObjectId, ref: "categories" }, // Self-referencing
    properties:[{ type:Object }]
  });

export const Categories = models.categories || model("categories", CategorySchema);
