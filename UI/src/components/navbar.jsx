import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-green-600 mb-9 text-white shadow-md">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Roxiler Challenge</h1>
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className=" font-bold hover:text-gray-300">Transactions</Link>
          </li>
          <li>
            <Link to="/Statistics" className="font-bold hover:text-gray-300">Statistics</Link>
          </li>
          <li>
            <Link to="/BarChart" className="font-bold hover:text-gray-300">BarChart</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
