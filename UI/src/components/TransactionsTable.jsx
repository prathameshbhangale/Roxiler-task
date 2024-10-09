import { fetchTransactions } from '../api/service/transactions.js';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setLoading, setError, nextPage, previousPage, setPerPage, setPage, setMonth } from '../slice/filterOption.js'; 

function TransactionsTable() {
    const dispatch = useDispatch();
    const [loading, setLoadingState] = useState(true);
    const [error, setErrorState] = useState(null);

    const page = useSelector((state) => state.filterOptions.page);
    const perPage = useSelector((state) => state.filterOptions.perPage);
    const month = useSelector((state) => state.filterOptions.month);
    const description = useSelector((state) => state.filterOptions.description);
    const price = useSelector((state) => state.filterOptions.price);
    const title = useSelector((state) => state.filterOptions.title);
    
    const [data, setData] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
            dispatch(setLoading(true));
            try {
                const transactions = await fetchTransactions({ page, perPage, month, title, description, price });
                console.log(transactions);
                setData(transactions);
            } catch (err) {
                console.log('Error fetching transactions:', err);
                setErrorState(err);
                dispatch(setError(err));
            } finally {
                setLoadingState(false);
                dispatch(setLoading(false));
            }
        };

        fetchData();
    }, [dispatch, page, perPage, month, title, description, price]);

    const handleNextPage = () => {
        dispatch(nextPage());
    };

    const handlePreviousPage = () => {
        dispatch(previousPage());
    };

    const handlePageChange = (e) => {
        const newPage = Number(e.target.value);
        if (newPage > 0) {
            dispatch(setPage(newPage));
        }
    };

    const handlePerPageChange = (e) => {
        const newPerPage = Number(e.target.value);
        if (newPerPage > 0) {
            dispatch(setPerPage(newPerPage));
        }
    };

    const handleMonthChange = (e) => {
        dispatch(setMonth(e.target.value)); // Dispatch the selected month to the Redux store
    };

    if (loading) {
        return <div className="text-center text-lg">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-lg text-red-600">Error: {error.message}</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-4xl text-center font-semibold mx-auto mb-7">Transactions Dashboard</h2>
            <div className="mb-4 flex justify-center">
                <label className="mr-2" htmlFor="month">Select Month:</label>
                <select 
                    id="month"
                    value={month}
                    onChange={handleMonthChange}
                    className="border rounded px-2 py-1"
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
            {data.length > 0 ? (
                <>
                    <table className="min-w-full my-4 bg-white border border-gray-300 rounded-lg shadow-lg">
                        <thead className="bg-green-600 text-white">
                            <tr>
                                <th className="w-1/5 py-3 px-4 text-left">ID</th>
                                <th className="w-2/5 py-3 px-4 text-left">Title</th>
                                <th className="w-2/5 py-3 px-4 text-left">Description</th>
                                <th className="w-1/5 py-3 px-4 text-left">Price</th>
                                <th className="w-1/5 py-3 px-4 text-left">Category</th> {/* New Category Header */}
                                <th className="w-1/5 py-3 px-4 text-left">Date of Sale</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(transaction => (
                                <tr key={transaction._id} className="border-b hover:bg-gray-100">
                                    <td className="w-1/5 py-2 px-4">{transaction._id}</td>
                                    <td className="w-2/5 py-2 px-4">{transaction.title}</td>
                                    <td className="w-2/5 py-2 px-4">{transaction.description}</td>
                                    <td className="w-1/5 py-2 px-4">${transaction.price.toFixed(2)}</td>
                                    <td className="w-1/5 py-2 px-4">{transaction.category}</td> {/* New Category Data */}
                                    <td className="w-1/5 py-2 px-4">{new Date(transaction.dateOfSale).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            ) : (
                <p className="text-center text-lg">No transactions found.</p>
            )}
            {/* Pagination Controls */}
            <div className="flex justify-between items-center my-4">
                <div>
                    <button 
                        onClick={handlePreviousPage} 
                        className="bg-blue-500 text-white px-4 py-2 rounded mr-2" 
                        disabled={page === 1}>
                        Previous
                    </button>
                    <button 
                        onClick={handleNextPage} 
                        className="bg-blue-500 text-white px-4 py-2 rounded">
                        Next
                    </button>
                </div>
                <div className="flex items-center">
                    <label className="mr-2">Page No:</label>
                    <input
                        type="number"
                        value={page}
                        onChange={handlePageChange}
                        className="border rounded px-2 py-1 w-20"
                        min={1}
                    />
                </div>
                <div className="flex items-center">
                    <label className="mr-2">Items Per Page:</label>
                    <input
                        type="number"
                        value={perPage}
                        onChange={handlePerPageChange}
                        className="border rounded px-2 py-1 w-20"
                        min={1}
                    />
                </div>
            </div>
        </div>
    );
}

export default TransactionsTable;
