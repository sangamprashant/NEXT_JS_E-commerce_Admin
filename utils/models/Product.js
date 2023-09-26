const { Schema, model, models, default: mongoose } = require("mongoose");

const ModelSchema = new Schema({
    title:{type:String, required:true},
    description:String,
    price:{type:Number,required:true},
    images:[{type:String}],
    category: { type: mongoose.Schema.Types.ObjectId, ref: "categories" },
    properties:{type:Object},
})

 export const Product = models.product||model("product",ModelSchema);