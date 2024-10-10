import Product from "../model/product.js";

export const TransactionsMonth = async (req, res) => {
  try {
    const { page = 1, perPage = 10, search = '', month = 3,title,description,price } = req.query;

    const pageNumber = parseInt(page);
    const itemsPerPage = parseInt(perPage);
    const selectedMonth = parseInt(month);

    const searchQuery = {
      $and: [
        {
          $or: [
            { title: { $regex: title, $options: 'i' } },
            { description: { $regex: description, $options: 'i' } },
            { price: { $regex: new RegExp(`^${price}$`, 'i') } } 
          ]
        },
        {
          $expr: { $eq: [{ $month: "$dateOfSale" }, selectedMonth] } 
        }
      ]
    };

    const query = search ? searchQuery : {
      $expr: { $eq: [{ $month: "$dateOfSale" }, selectedMonth] }
    };

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
