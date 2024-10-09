import axios from 'axios';
import { TRANSACTION_API_URL } from '../url.js';

export const fetchTransactions = async ({ page=1, perPage=10, search, month = 3, title=undefined, description=undefined, price=undefined }) => {
    try {
        
        let params={
            page,
            perPage,
            month,
            search,
        }
        console.log(1)
        if(title != ''){
            params.title = title;
        }
        if(description != ''){
            params.description = description;
        }
        if(price != 0){
            params.price = price;
        }
        console.log(params)
        const response = await axios.get(TRANSACTION_API_URL, {
            params
        });
        console.log(response);
        return response.data.transactions;
    } catch (error) {
        console.error('Error fetching transactions:', error);
        throw error; 
    }
};
