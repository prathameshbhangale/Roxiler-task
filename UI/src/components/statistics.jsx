import { fetchstatistics } from '../api/service/statistics.js';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setLoading, setError, setMonth } from '../slice/filterOption.js'; 

function Statistics() {
    const [data, setData] = useState({
        totalSaleAmount: 0,
        totalSoldItems: 0,
        totalNotSoldItems: 0
    });

    const dispatch = useDispatch();
    const month = useSelector((state) => state.filterOptions.month);

    const handleMonthChange = (e) => {
        dispatch(setMonth(e.target.value)); 
    };

    useEffect(() => {
        const fetchData = async () => {
            dispatch(setLoading(true));
            try {
                const stasticsData = await fetchstatistics({ month });
                setData(stasticsData);
                console.log(stasticsData);
            } catch (err) {
                console.log('Error fetching stasticsData:', err);
                dispatch(setError(err));
            } finally {
                dispatch(setLoading(false));
            }
        };

        fetchData();
    }, [dispatch, month]);

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-4xl text-center font-semibold mb-10">Sales Statistics</h2>

            {/* Month Selector */}
            <div className="mb-8 flex justify-center">
                <label className="mr-4 text-lg font-medium" htmlFor="month">Select Month:</label>
                <select 
                    id="month"
                    value={month}
                    onChange={handleMonthChange}
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-green-600"
                >
                    <option value="">All</option>
                    {Array.from({ length: 12 }, (_, index) => {
                        const monthName = new Date(0, index).toLocaleString('default', { month: 'long' });
                        return (
                            <option key={index} value={index + 1}>
                                {monthName}
                            </option>
                        );
                    })}
                </select>
            </div>

            {/* Statistics Display */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                <div className="p-6 bg-white shadow-lg rounded-lg border border-gray-200">
                    <h3 className="text-2xl font-bold mb-4">Total Sale Amount</h3>
                    <p className="text-4xl font-semibold text-green-600">${data.totalSaleAmount}</p>
                </div>

                <div className="p-6 bg-white shadow-lg rounded-lg border border-gray-200">
                    <h3 className="text-2xl font-bold mb-4">Total Sold Items</h3>
                    <p className="text-4xl font-semibold text-blue-600">{data.totalSoldItems}</p>
                </div>

                <div className="p-6 bg-white shadow-lg rounded-lg border border-gray-200">
                    <h3 className="text-2xl font-bold mb-4">Total Unsold Items</h3>
                    <p className="text-4xl font-semibold text-red-600">{data.totalNotSoldItems}</p>
                </div>
            </div>
        </div>
    );
}

export default Statistics;
