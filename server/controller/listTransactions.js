import Product from "../model/product.js";

export const listTransactions = async (req, res) => {
  try {
    const { page = 1, perPage = 10, search = '' } = req.query;

    const pageNumber = parseInt(page);
    const itemsPerPage = parseInt(perPage);

    const searchQuery = {
      $or: [
        { title: { $regex: search, $options: 'i' } }, 
        { description: { $regex: search, $options: 'i' } },
        { price: { $regex: search, $options: 'i' } }  
      ]
    };

    const query = search ? searchQuery : {};

    const skip = (pageNumber - 1) * itemsPerPage;

    const transactions = await Product.find(query)
      .skip(skip)
      .limit(itemsPerPage);

    const total = await Product.countDocuments(query);

    res.status(200).json({
        success: true,
        page: pageNumber,
        perPage: itemsPerPage,
        total,
        transactions
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
