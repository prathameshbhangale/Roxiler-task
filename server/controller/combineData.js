import Product from '../model/product.js';
import axios from 'axios';

export const combineData = async (req, res) => {
    try {
        const { month } = req.query;

        if (!month || month < 1 || month > 12) {
        return res.status(400).json({ message: "Please provide a valid month (1-12)." });
        }

        const statistics = (await axios.get(`${process.env.BASE_URI}/api/v1/statistics?month=${month}`)).data;
        const barChart = (await axios.get(`${process.env.BASE_URI}/api/v1/barChart?month=${month}`)).data;
        const pieChart = (await axios.get(`${process.env.BASE_URI}/api/v1/pieChart?month=${month}`)).data;

        res.status(200).json({
            success:true,
            data:{
                statistics,
                barChart,
                pieChart
            }
        });

    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: error.message
        });
    }
}