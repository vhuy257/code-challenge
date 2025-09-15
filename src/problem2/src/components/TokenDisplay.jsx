import React from 'react';
import { motion } from 'framer-motion';

const TokenDisplay = ({ token, amount, isReceiving = false, className = '' }) => {
  if (!token) return null;

  const formatAmount = (amount) => {
    if (!amount || isNaN(amount)) return '0.00';
    return parseFloat(amount).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 6
    });
  };

  return (
    <motion.div 
      className={`token-display ${className}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="token-info">
        <motion.img 
          src={token.icon}
          alt={token.label}
          className="token-icon"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
        <div className="token-details">
          <span className="token-symbol">{token.label}</span>
          <span className="token-price">${formatAmount(token.price)}</span>
        </div>
      </div>
      {amount && (
        <motion.div 
          className={`token-amount ${isReceiving ? 'receiving' : ''}`}
          initial={{ opacity: 0, x: isReceiving ? 20 : -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          {formatAmount(amount)}
        </motion.div>
      )}
    </motion.div>
  );
};

export default TokenDisplay;
