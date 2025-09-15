import { useState, useEffect, useCallback } from 'react';
import Select from 'react-select';
import { motion, AnimatePresence } from 'framer-motion';
import { FaExchangeAlt, FaArrowDown, FaSpinner, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { IoIosRefresh } from "react-icons/io";
import { useTokenPrices } from '../hooks/useTokenPrices';
import TokenDisplay from './TokenDisplay';
import './CurrencySwapForm.css';

const CurrencySwapForm = () => {
  const [fromCurrency, setFromCurrency] = useState(null);
  const [toCurrency, setToCurrency] = useState(null);
  const [amount, setAmount] = useState('');
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [exchangeRate, setExchangeRate] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);

  const { 
    loading: isLoading, 
    error: apiError, 
    refetch,
    getTokenOptions,
    calculateExchangeRate,
    formatPrice
  } = useTokenPrices();

  const currencies = getTokenOptions();
  
  console.log('Currencies in form:', currencies);
  // Debug logging
  useEffect(() => {
    console.log('Currencies in form:', currencies);
    console.log('Loading state:', isLoading);
    console.log('Error state:', apiError);
  }, [currencies, isLoading, apiError]);

  // Calculate conversion when inputs change
  useEffect(() => {
    if (fromCurrency && toCurrency && amount && !isNaN(amount) && amount > 0) {
      calculateConversion();
    } else {
      setConvertedAmount(null);
      setExchangeRate(null);
    }
  }, [fromCurrency, toCurrency, amount]);

  const calculateConversion = useCallback(async () => {
    if (!fromCurrency || !toCurrency || !amount) return;

    try {
      setIsCalculating(true);
      setError('');

      // Calculate exchange rate using hook
      const rate = calculateExchangeRate(fromCurrency.value, toCurrency.value);
      
      if (rate) {
        const converted = (parseFloat(amount) * rate).toFixed(6);
        setExchangeRate(rate);
        setConvertedAmount(converted);
      } else {
        setError('Không thể tính toán tỷ giá cho cặp token này');
      }
    } catch (error) {
      setError('Lỗi tính toán tỷ giá');
    } finally {
      setIsCalculating(false);
    }
  }, [fromCurrency, toCurrency, amount, calculateExchangeRate]);

  const handleSwap = () => {
    if (fromCurrency && toCurrency) {
      setFromCurrency(toCurrency);
      setToCurrency(fromCurrency);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (fromCurrency && toCurrency && amount && convertedAmount) {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (value === '' || (!isNaN(value) && parseFloat(value) >= 0)) {
      setAmount(value);
    }
  };

  // Set error from API if exists
  useEffect(() => {
    if (apiError) {
      setError(apiError);
    }
  }, [apiError]);

  const customSelectStyles = {
    control: (provided, state) => ({
      ...provided,
      minHeight: '60px',
      border: state.isFocused ? '2px solid #6366f1' : '2px solid #e5e7eb',
      borderRadius: '12px',
      boxShadow: state.isFocused ? '0 0 0 3px rgba(99, 102, 241, 0.1)' : 'none',
      '&:hover': {
        border: '2px solid #6366f1'
      }
    }),
    option: (provided, state) => ({
      ...provided,
      padding: '12px 16px',
      display: 'flex',
      alignItems: 'center',
      backgroundColor: state.isSelected ? '#6366f1' : state.isFocused ? '#f3f4f6' : 'white',
      color: state.isSelected ? 'white' : '#374151'
    }),
    singleValue: (provided) => ({
      ...provided,
      display: 'flex',
      alignItems: 'center'
    })
  };

  const formatOptionLabel = (option) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <img 
        src={option.icon} 
        alt={option.label}
        style={{ width: '24px', height: '24px' }}
        onError={(e) => {
          e.target.style.display = 'none';
        }}
      />
      <div>
        <div style={{ fontWeight: '500' }}>{option.label}</div>
        <div style={{ fontSize: '12px', color: '#6b7280' }}>
          ${option.price?.toFixed(4)}
        </div>
      </div>
    </div>
  );

  return (
    <motion.div 
      className="currency-swap-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="swap-header">
        <h1>Currency Swap</h1>
        <p>Exchange your tokens instantly with real-time rates</p>
        <motion.button
          className="refresh-button"
          onClick={refetch}
          disabled={isLoading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <IoIosRefresh  className={isLoading ? 'spinning' : ''} />
          Refresh Prices
        </motion.button>
      </div>

      <motion.form 
        className="swap-form"
        onSubmit={handleSubmit}
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <AnimatePresence>
          {error && (
            <motion.div 
              className="error-message"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <FaExclamationTriangle />
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {currencies.length === 0 && !isLoading && (
          <motion.div 
            className="info-message"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <FaExclamationTriangle />
            Không có token nào available. Vui lòng thử refresh.
          </motion.div>
        )}

        {currencies.length > 0 && (
          <motion.div 
            className="success-message"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <FaCheckCircle />
            {currencies.length} tokens available
          </motion.div>
        )}

        <div className="form-section">
          <label className="form-label">Amount to send</label>
          <div className="input-container">
            <input
              type="text"
              value={amount}
              onChange={handleAmountChange}
              placeholder="0.00"
              className="amount-input"
            />
            {fromCurrency && (
              <TokenDisplay token={fromCurrency} />
            )}
          </div>
        </div>

        <div className="form-section">
          <label className="form-label">From</label>
          <Select
            options={currencies}
            value={fromCurrency}
            onChange={setFromCurrency}
            placeholder="Select token"
            formatOptionLabel={formatOptionLabel}
            styles={customSelectStyles}
            isLoading={isLoading}
            isSearchable
            className="currency-select"
          />
        </div>

        <motion.button
          type="button"
          className="swap-button"
          onClick={handleSwap}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={!fromCurrency || !toCurrency}
        >
          <FaExchangeAlt />
        </motion.button>

        <div className="form-section">
          <label className="form-label">To</label>
          <Select
            options={currencies}
            value={toCurrency}
            onChange={setToCurrency}
            placeholder="Select token"
            formatOptionLabel={formatOptionLabel}
            styles={customSelectStyles}
            isLoading={isLoading}
            isSearchable
            className="currency-select"
          />
        </div>

        <div className="form-section">
          <label className="form-label">Amount to receive</label>
          <div className="input-container">
            <input
              type="text"
              value={convertedAmount || ''}
              readOnly
              placeholder="0.00"
              className="amount-input receive-input"
            />
            {toCurrency && (
              <TokenDisplay token={toCurrency} amount={convertedAmount} isReceiving />
            )}
          </div>
        </div>

        {exchangeRate && (
          <motion.div 
            className="exchange-rate"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <FaArrowDown />
            <span>
              1 {fromCurrency?.label} = {formatPrice(exchangeRate)} {toCurrency?.label}
            </span>
          </motion.div>
        )}

        <motion.button
          type="submit"
          className="confirm-button"
          disabled={!fromCurrency || !toCurrency || !amount || isCalculating}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isCalculating ? (
            <>
              <FaSpinner className="spinning" />
              Calculating...
            </>
          ) : success ? (
            <>
              <FaCheckCircle />
              Swap Successful!
            </>
          ) : (
            'CONFIRM SWAP'
          )}
        </motion.button>
      </motion.form>
    </motion.div>
  );
};

export default CurrencySwapForm;
