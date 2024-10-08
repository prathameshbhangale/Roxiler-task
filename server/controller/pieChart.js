import Product from '../model/product.js';

export const getCategoryPieChart = async (req, res) => {
  try {
    const { month } = req.query;

    if (!month || month < 1 || month > 12) {
      return res.status(400).json({ message: "Please provide a valid month (1-12)." });
    }

    const products = await Product.find({
      $expr: { $eq: [{ $month: "$dateOfSale" }, month] }
    });

    const categoryMap = {};

    products.forEach(product => {
      const category = product.category;

      if (categoryMap[category]) {
        categoryMap[category]++;
      } else {
        categoryMap[category] = 1;
      }
    });

    const categoryData = Object.entries(categoryMap).map(([category, count]) => ({
      category,
      count
    }));

    res.status(200).json({
        success:true,
        data:categoryData
    });
  } catch (error) {
    res.status(500).json({ 
        success: false,
        message: `Internal Server Error ${error.message}`
     });
  }
};
