import axios from 'axios';
import Product from '../model/product.js';

export const fetchAndInsertProducts = async (req, res) => {
  try {
    const { data } = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');

    if (Array.isArray(data)) {
      const savedProducts = await Product.insertMany(data);

      res.status(201).json({
        success: true,
        message: `${savedProducts.length} products successfully inserted`,
        data: savedProducts
      });
    } else {
      throw new Error("Invalid data format from the external API");
    }
  } catch (error) {
    res.status(500).json({
        success: false,
        message: "products insertion problem",
        error: error.message
    });
  }
};
