const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    product_id:{
        type: String
      },
    title: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    img: {
    type: String,
    required: false,
    default: "https://furntech.org.za/wp-content/uploads/2017/05/placeholder-image.png",
  },
    description: {
        type: String,
        required: true,
        
    },
    creator: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("Product", productSchema);