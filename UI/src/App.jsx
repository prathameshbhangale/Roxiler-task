import { useState } from 'react'
import TransactionsTable from './components/TransactionsTable';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Navbar from './components/navbar';
import Statistics from "../src/components/statistics";
import BarChrt from './components/BarChrt';

function App() {
  const [count, setCount] = useState(0);
  return (
    <>
    <Navbar></Navbar>
    <Routes>
        <Route path="/" element={<TransactionsTable />} />
        <Route path="/Statistics" element={<Statistics/>} />
        <Route path="/BarChart" element={<BarChrt/>} />
      </Routes>
    </>
  )
}

export default App
