// import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Stock = () => {
  const [stocks, setStocks] = useState([]);
  const [numStocks, setNumStocks] = useState(5); // Default to 5 stocks


  const fetchStocks = async () => {
    try {
      const response = await axios.get(`/api/stocks?num=${numStocks}`, {
        headers: {
          'X-API-Key': 'ViN36JWYjFUcEw7sUxdhfHaXhmlUcpwg',
          'X-API-Secret': '833ae989-bea7-4561-b7d2-fb6c78a4392a'
        }
      });
      setStocks(response.data.stocks);
    } catch (error) {
      console.error('Error fetching stocks:', error);
    }
  };


  const handleChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value <= 20) {
      setNumStocks(value);
    }
  };

  console.log("stocks is ",  stocks)

  console.log("hello wordl")
  return (
    <div>
      <h1>Stocks Dashboard</h1>
      <label htmlFor="numStocks">Enter number of stocks (max 20):</label>
      <input
        type="number"
        id="numStocks"
        value={numStocks}
        onChange={handleChange}
        min="1"
        max="20"
      />
      <div>
        {stocks.map((stock) => (
          <div key={stock.symbol}>
            <h3>{stock.symbol}</h3>
            <p>Price: {stock.price}</p>
            <p>Open Price: {stock.openPrice}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stock;
