import Product from '../model/product.js';
import moment from 'moment';

export const getStatistics = async (req, res) => {
  try {
    const { month = 1, year = 2022 } = req.query;

    if (!month || !year) {
      return res.status(400).json({ message: "Please provide both month and year." });
    }
    if(month > 12){
        return res.status(400).json({
            message: "Invalid month. Please enter a month between 1 and 12."
        });
    }

    const startDate = moment(`${year}-${month}-01`).startOf('month').toDate();
    const endDate = moment(startDate).endOf('month').toDate();

    const totalSales = await Product.aggregate([
      {
        $match: {
          sold: true,
          dateOfSale: {
            $gte: startDate,
            $lt: endDate,
          },
        },
      },
      {
        $group: {
            _id: null,
            totalAmount: { $sum: '$price' },
        },
      },
    ]);
    // console.log(totalSales)
    const totalSoldItems = await Product.countDocuments({
      sold: true,
      dateOfSale: {
        $gte: startDate,
        $lt: endDate,
      },
    });

    const totalNotSoldItems = await Product.countDocuments({
      sold: false,
    });
    let data = {
        totalSales: totalSales.length > 0 ? totalSales[0].totalAmount : 0,
        totalSoldItems,
        totalNotSoldItems,
    }
    res.status(200).json({
        succenss: true,
        data,
    });
  } catch (error) {
    res.status(500).json({
        succenss: false,
        message: error.message 
    });
  }
};
