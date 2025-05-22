import React, { useState } from 'react';
import holdingsData from '../data/holdingsData';
import './HoldingsTable.css';

function HoldingsTable({ onSelectionChange }) {
  const [selectedHoldings, setSelectedHoldings] = useState({});
  const [sellAmounts, setSellAmounts] = useState({});

  const handleCheckboxChange = (event, holding) => {
    const isChecked = event.target.checked;
    setSelectedHoldings(prev => {
      const updated = { ...prev };
      if (isChecked) {
        updated[holding.coin] = true;
      } else {
        delete updated[holding.coin];
      }
      return updated;
    });
    if (onSelectionChange) {
      onSelectionChange(isChecked, holding, sellAmounts[holding.coin] || 0);
    }
  };

  const handleSellAmountChange = (event, coin) => {
    const amount = parseFloat(event.target.value) || 0;
    setSellAmounts(prev => ({
      ...prev,
      [coin]: amount,
    }));
    const holding = holdingsData.find(h => h.coin === coin);
    if (holding && selectedHoldings[coin]) {
      onSelectionChange(true, holding, amount);
    }
  };

  return (
    <div className="holdings-table-container">
      <h2>Holdings</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Asset</th>
            <th>Holdings</th>
            <th>Current Price</th>
            <th>Short-term</th>
            <th>Long-term</th>
            <th>Amount to Sell</th>
          </tr>
        </thead>
        <tbody>
          {holdingsData.map((holding) => (
            <tr
              key={holding.coin}
              className={holding.stcg.gain < 0 || holding.ltcg.gain < 0 ? 'loss-opportunity' : ''}
            >
              <td>
                <input
                  type="checkbox"
                  checked={!!selectedHoldings[holding.coin]}
                  onChange={(e) => handleCheckboxChange(e, holding)}
                />
              </td>
              <td>
                <div className="asset-info">
                  <img src={holding.logo} alt={holding.coinName} width="20" height="20" />
                  <span>{holding.coinName} ({holding.coin})</span>
                </div>
              </td>
              <td>
                <div>{holding.totalHolding.toFixed(8)} {holding.coin}</div>
                <div className="avg-buy">Avg Buy: ₹{holding.averageBuyPrice?.toFixed(2)}</div>
              </td>
              <td>₹{holding.currentPrice?.toFixed(2)}</td>
              <td className={holding.stcg.gain >= 0 ? 'gain' : 'loss'}>
                ₹{holding.stcg.gain?.toFixed(2)} ({holding.stcg.balance?.toFixed(8)} {holding.coin})
              </td>
              <td className={holding.ltcg.gain >= 0 ? 'gain' : 'loss'}>
                ₹{holding.ltcg.gain?.toFixed(2)} ({holding.ltcg.balance?.toFixed(8)} {holding.coin})
              </td>
              <td>
                <input
                  type="number"
                  placeholder="Amount"
                  value={sellAmounts[holding.coin] || ''}
                  onChange={(e) => handleSellAmountChange(e, holding.coin)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HoldingsTable;