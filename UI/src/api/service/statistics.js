import axios from 'axios';
import { STATISTICS_API_URL } from '../url.js';

export const fetchstatistics = async ({  month = 3}) => {
    try {
        
        let params={
            month
        }
        const response = await axios.get(STATISTICS_API_URL, {
            params
        });
        
        return response.data.data;
    } catch (error) {
        console.error('Error fetching statistics:', error);
        throw error; 
    }
};
