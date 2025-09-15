import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export const useTokenPrices = () => {
  const [prices, setPrices] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPrices = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching token prices...');
      const response = await axios.get('https://interview.switcheo.com/prices.json', {
        timeout: 10000, // 10 second timeout
      });
      
      const validPrices = {};
      response.data.map((token) => {
        const price = token.price;
        if (price && price > 0 && !isNaN(price)) {
          validPrices[token.currency] = price;
        }
      });
      
      console.log('Valid prices:', validPrices);
      setPrices(validPrices);
    } catch (err) {
      console.error('Error fetching token prices:', err);
      setError(`Không thể tải dữ liệu giá token: ${err.message}`);
      
      // Fallback data for development/testing
      const fallbackPrices = {
        'BTC': 45000,
        'ETH': 3000,
        'USDC': 1,
        'USDT': 1,
        'BNB': 320,
        'ADA': 0.5,
        'DOT': 7,
        'LINK': 14,
        'UNI': 6,
        'AAVE': 120
      };
      console.log('Using fallback prices:', fallbackPrices);
      setPrices(fallbackPrices);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPrices();
    
    // Refresh prices every 30 seconds
    const interval = setInterval(fetchPrices, 30000);
    
    return () => clearInterval(interval);
  }, [fetchPrices]);

  const getTokenIconUrl = (token) => {
    return `https://raw.githubusercontent.com/Switcheo/token-icons/c884d9c223e70c70efae3ece3dc9eaffba28ca56/tokens/${token}.svg`;
  };

  const calculateExchangeRate = (fromToken, toToken) => {
    if (!prices[fromToken] || !prices[toToken]) {
      return null;
    }
    return prices[toToken] / prices[fromToken];
  };

  const formatPrice = (price, decimals = 4) => {
    if (!price || isNaN(price)) return 'N/A';
    return parseFloat(price).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: decimals
    });
  };

  const getTokenOptions = () => {
    const options = Object.keys(prices)
      .map(token => ({
        value: token,
        label: token,
        price: prices[token],
        icon: getTokenIconUrl(token)
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
    
    console.log('Token options generated:', prices, 'tokens');
    return options;
  };

  return {
    prices,
    loading,
    error,
    refetch: fetchPrices,
    getTokenIconUrl,
    calculateExchangeRate,
    formatPrice,
    getTokenOptions
  };
};
