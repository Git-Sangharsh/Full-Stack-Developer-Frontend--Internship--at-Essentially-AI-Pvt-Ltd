import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Stock.css";
const SecondStock = () => {
  const [stocks, setStocks] = useState([]);
  const [fetchCount, setFetchCount] = useState(0);
  const [searchCount, setSearchCount] = useState(0);

  useEffect(() => {
    // Function to fetch stock data
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/stockdatafile");
        const slicedStocks = response.data.slice(0, searchCount);
        setStocks(slicedStocks);
      } catch (error) {
        console.error("Error fetching stocks:", error);
      }
    };

    // Fetch initial data and start polling when component mounts
    fetchData();
    const intervalId = setInterval(fetchData, 1000);

    // Clean up interval when component unmounts
    return () => clearInterval(intervalId);
  }, [searchCount]); // Only re-run effect when searchCount changes

  const handleFetchStocks = () => {
    // Validate count not to exceed 20
    if (fetchCount > 20) {
      alert("Count should not exceed 20");
      return;
    }

    // Update search count
    setSearchCount(fetchCount);
  };

  console.log("stocks is ", stocks);

  return (
    <div className="stock-wrapper">
      <h1 className="stocks-title">Stocks</h1>

      <div className="nav">
        <input
          type="number"
          min="1"
          max="20"
          value={fetchCount}
          onChange={(e) => setFetchCount(parseInt(e.target.value))}
        />
        <button onClick={handleFetchStocks}>Search</button>
      </div>

      <div className="main">
        <div className="stocks-header">
          <h3>Symbol</h3>
          <h3>From</h3>
          <h3>Open</h3>
          <h3>Close</h3>
          <h3>High</h3>
          <h3>Low</h3>
          <h3>PreMarket</h3>
          <h3>Volume</h3>
        </div>
        {stocks.map((stock, index) => (
          <div className="stock-grid" key={index}>
            {/* Assuming details is an object within each stock */}

            {stock.details && (
              <div className="stock-details">
                <p className="stock-details-p">{stock.details.symbol}</p>
                <p className="stock-details-p"> {stock.details.from}</p>
                <p className="stock-details-p">
                  {stock.details.open === 0 ? "Fetching Data" : stock.open}
                </p>
                <p className="stock-details-p"> {stock.details.close}</p>
                <p className="stock-details-p"> {stock.details.high}</p>
                <p className="stock-details-p"> {stock.details.low}</p>
                <p className="stock-details-p"> {stock.details.preMarket}</p>
                <p className="stock-details-p"> {stock.details.volume}</p>
                {/* Add other details properties here */}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SecondStock;
