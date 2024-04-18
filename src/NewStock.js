import React, { useEffect, useState } from "react";
import axios from "axios";

const NewStock = () => {
  const [stocks, setStocks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const symbols = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'FB']; // Include only five symbols
        const interval = 60 * 1000 / 5; // 5 API calls per minute

        const stockDataPromises = symbols.map(async (symbol, index) => {
          try {
            const response = await axios.get(
              `https://api.polygon.io/v2/aggs/ticker/${symbol}/range/1/day/2024-04-16/2024-04-16`,
              {
                params: {
                  apiKey: "ViN36JWYjFUcEw7sUxdhfHaXhmlUcpwg", // Replace with your actual API key
                },
              }
            );
            // Assuming the API response includes a "name" property for the stock name
            const data = {
              symbol,
              name: response.data.results[0].name,
              ...response.data.results[0],
            };
            // Delay fetching for each stock based on the index and interval
            await delay(index * interval);
            return data;
          } catch (error) {
            console.error(`Error fetching stock ${symbol}:`, error);
            return null; // Return null for failed requests
          }
        });

        const stockData = await Promise.all(stockDataPromises);
        // Filter out null values for failed requests
        const filteredStockData = stockData.filter(stock => stock !== null);
        setStocks(filteredStockData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching stocks:", error);
      }
    };

    fetchStockData();
  }, []);

  const delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };

  console.log("stocks is ", stocks);

  return (
    <div>
      <h1>Stock Data</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {stocks.map((stock, index) => (
            <li key={index}>
              {stock["symbol"]} {stock["T"]} Open Price: {stock["o"]}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NewStock;
