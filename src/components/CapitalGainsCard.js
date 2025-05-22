import React from 'react';
import './CapitalGainsCard.css';

function CapitalGainsCard({ preHarvesting, afterHarvesting }) {
  console.log("CapitalGainsCard rendered", { preHarvesting }, { afterHarvesting });

  const { stcg: preStcg, ltcg: preLtcg } = preHarvesting || { stcg: {}, ltcg: {} };
  const { stcg: afterStcg, ltcg: afterLtcg } = afterHarvesting?.capitalGains || { stcg: {}, ltcg: {} };

  const preNetStcg = (preStcg?.profits || 0) - (preStcg?.losses || 0);
  const preNetLtcg = (preLtcg?.profits || 0) - (preLtcg?.losses || 0);
  const preRealisedGains = preNetStcg + preNetLtcg;

  const afterNetStcg = (afterStcg?.profits || 0) - (afterStcg?.losses || 0);
  const afterNetLtcg = (afterLtcg?.profits || 0) - (afterLtcg?.losses || 0);
  const afterRealisedGains = afterNetStcg + afterNetLtcg;

  const savings = preRealisedGains - afterRealisedGains;
  const showSavings = savings > 0;

  return (
    <div className="capital-gains-container">
      <div className="pre-harvesting-card">
        <h3>Pre Harvesting</h3>
        <div className="gains-row">
          <span>Short-term</span>
          <div>
            <div className="profit">Profits: ₹{(preStcg?.profits || 0).toFixed(2)}</div>
            <div className="loss">Losses: ₹{(preStcg?.losses || 0).toFixed(2)}</div>
            <div className="net">Net Capital Gains: ₹{preNetStcg.toFixed(2)}</div>
          </div>
        </div>
        <div className="gains-row">
          <span>Long-term</span>
          <div>
            <div className="profit">Profits: ₹{(preLtcg?.profits || 0).toFixed(2)}</div>
            <div className="loss">Losses: ₹{(preLtcg?.losses || 0).toFixed(2)}</div>
            <div className="net">Net Capital Gains: ₹{preNetLtcg.toFixed(2)}</div>
          </div>
        </div>
        <div className="realised-gains">
          Realised Capital Gains: ₹{preRealisedGains.toFixed(2)}
        </div>
      </div>

      <div className="after-harvesting-card">
        <h3>After Harvesting</h3>
        <div className="gains-row">
          <span>Short-term</span>
          <div>
            <div className="profit">Profits: ₹{(afterStcg?.profits || 0).toFixed(2)}</div>
            <div className="loss">Losses: ₹{(afterStcg?.losses || 0).toFixed(2)}</div>
            <div className="net">Net Capital Gains: ₹{afterNetStcg.toFixed(2)}</div>
          </div>
        </div>
        <div className="gains-row">
          <span>Long-term</span>
          <div>
            <div className="profit">Profits: ₹{(afterLtcg?.profits || 0).toFixed(2)}</div>
            <div className="loss">Losses: ₹{(afterLtcg?.losses || 0).toFixed(2)}</div>
            <div className="net">Net Capital Gains: ₹{afterNetLtcg.toFixed(2)}</div>
          </div>
        </div>
        <div className="effective-capital-gains">
          Effective Capital Gains: ₹{afterRealisedGains.toFixed(2)}
        </div>
        {showSavings && (
          <div className="savings-message">
            You're going to save ₹{savings.toFixed(2)}
          </div>
        )}
      </div>
    </div>
  );
}

export default CapitalGainsCard;