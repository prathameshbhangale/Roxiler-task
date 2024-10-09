import axios from 'axios';
import { BARCHART_API_URL } from '../url.js';

function getKeysAndValues(obj) {
    const Xaxis = Object.keys(obj);
    const Yaxis = Object.values(obj);
    
    return { Xaxis, Yaxis };
}

export const fetchBarChart = async ({  month = 3}) => {
    try {
        
        let params={
            month
        }
        const response = await axios.get(BARCHART_API_URL, {
            params
        });
        console.log(response)
        let result = getKeysAndValues(response.data.data)
        return result;
    } catch (error) {
        console.error('Error fetching bar chart:', error);
        throw error; 
    }
};
