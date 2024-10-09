import { useState } from 'react'
import TransactionsTable from './components/TransactionsTable';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Navbar from './components/navbar';
import Statistics from "../src/components/statistics";

function App() {
  const [count, setCount] = useState(0);
  return (
    <>
    <Navbar></Navbar>
    <Routes>
        <Route path="/" element={<TransactionsTable />} />
        <Route path="/Statistics" element={<Statistics/>} />
      </Routes>
    </>
  )
}

export default App
