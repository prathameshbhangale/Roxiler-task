import Product from '../model/product.js';

export const getPriceRangeBarChart = async (req, res) => {
  try {
    const { month } = req.query;

    if (!month || month < 1 || month > 12) {
      return res.status(400).json({ message: "Please provide a valid month (1-12)." });
    }

    const products = await Product.find({
      $expr: { $eq: [{ $month: "$dateOfSale" }, month] }
    });
    console.log(products)
    
    const priceRanges = {
      "0-100": 0,
      "101-200": 0,
      "201-300": 0,
      "301-400": 0,
      "401-500": 0,
      "501-600": 0,
      "601-700": 0,
      "701-800": 0,
      "801-900": 0,
      "901-above": 0
    };

    
    products.forEach(product => {
      if (product.price >= 0 && product.price <= 100) {
        priceRanges["0-100"]++;
      } else if (product.price >= 101 && product.price <= 200) {
        priceRanges["101-200"]++;
      } else if (product.price >= 201 && product.price <= 300) {
        priceRanges["201-300"]++;
      } else if (product.price >= 301 && product.price <= 400) {
        priceRanges["301-400"]++;
      } else if (product.price >= 401 && product.price <= 500) {
        priceRanges["401-500"]++;
      } else if (product.price >= 501 && product.price <= 600) {
        priceRanges["501-600"]++;
      } else if (product.price >= 601 && product.price <= 700) {
        priceRanges["601-700"]++;
      } else if (product.price >= 701 && product.price <= 800) {
        priceRanges["701-800"]++;
      } else if (product.price >= 801 && product.price <= 900) {
        priceRanges["801-900"]++;
      } else if (product.price >= 901) {
        priceRanges["901-above"]++;
      }
    });

    res.status(200).json(priceRanges);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
