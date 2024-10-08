import Product from '../model/product.js';
import moment from 'moment';

export const getStatistics = async (req, res) => {
  try {
    const { month } = req.query;

    if (!month || month < 1 || month > 12) {
      return res.status(400).json({ message: "Please provide a valid month (1-12)." });
    }

    const soldProducts = await Product.find({
      $expr: { $eq: [{ $month: "$dateOfSale" }, parseInt(month)] },
      sold: true 
    });

    const totalSaleAmount = soldProducts.reduce((total, product) => total + product.price, 0);
    const totalSoldItems = soldProducts.length;

    const allProducts = await Product.find({
      $expr: { $eq: [{ $month: "$dateOfSale" }, parseInt(month)] }
    });

    const totalNotSoldItems = allProducts.length - totalSoldItems;

    const statistics = {
      totalSaleAmount,
      totalSoldItems,
      totalNotSoldItems
    };

    res.status(200).json({
      success:true,
      data: statistics
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message
     });
  }
};
