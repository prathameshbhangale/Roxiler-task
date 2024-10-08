import mongoose from 'mongoose';

// Product Schema
const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  sold: {
    type: Boolean,
    default: false,
  },
  dateOfSale: {
    type: Date,
    default: null, 
  },
}, {
  timestamps: true, 
});

const Product = mongoose.model('Product', productSchema);

export default Product;
