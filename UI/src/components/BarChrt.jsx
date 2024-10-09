import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setLoading, setError, setMonth } from '../slice/filterOption.js';
import { fetchBarChart } from '../api/service/barChart.js'; 


export default function BarChrt() {

    const [data, setData] = useState({ Xaxis: [], Yaxis: [] });

    const dispatch = useDispatch();
    const month = useSelector((state) => state.filterOptions.month);

    const handleMonthChange = (e) => {
        dispatch(setMonth(e.target.value)); 
    };

    useEffect(() => {
        const fetchData = async () => {
            dispatch(setLoading(true));
            try {
                const stasticsData = await fetchBarChart({ month });
        setData(stasticsData);
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
    <>
    <h2 className="text-4xl text-center font-semibold mb-10">Price Range</h2>
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
    <BarChart className='mx-auto mt-5'
      width={1000}
      height={400}
      series={[
        { data: data.Yaxis, label: 'price', id: 'pvId' },
      ]}
      xAxis={[{ data: data.Xaxis, scaleType: 'band' }]}
    />
    </>
  );
}