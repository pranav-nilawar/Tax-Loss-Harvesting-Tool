import React, { useState, useEffect } from 'react';
import CapitalGainsCard from './components/CapitalGainsCard';
import HoldingsTable from './components/HoldingsTable';
import capitalGainsData from './data/capitalGainsData';
import holdingsData from './data/holdingsData';
import './App.css';

function App() {
  const [afterHarvestingGains, setAfterHarvestingGains] = useState(capitalGainsData.capitalGains);
  const preHarvestingGains = capitalGainsData.capitalGains;
  const [selectedHoldings, setSelectedHoldings] = useState({});

  const handleHoldingSelection = (isSelected, holding, sellAmount = 0) => {
    setSelectedHoldings(prev => {
      const updatedSelection = { ...prev };
      if (holding) {
        if (isSelected) {
          updatedSelection[holding.coin] = { ...holding, sellAmount };
        } else {
          delete updatedSelection[holding.coin];
        }
      }
      console.log("Updated selectedHoldings:", updatedSelection);
      return updatedSelection;
    });
  };

  useEffect(() => {
    let adjStcgProfits = preHarvestingGains.stcg.profits;
    let adjStcgLosses = preHarvestingGains.stcg.losses;
    let adjLtcgProfits = preHarvestingGains.ltcg.profits;
    let adjLtcgLosses = preHarvestingGains.ltcg.losses;

    const currentSelected = Object.values(selectedHoldings);
    console.log("Current selected holdings for calculation:", currentSelected);

    currentSelected.forEach(selected => {
      console.log("Processing:", selected?.coin, "Sell Amount:", selected?.sellAmount);
      let sellAmountToUse = selected?.sellAmount;
      if (sellAmountToUse === undefined || sellAmountToUse === 0) {
        sellAmountToUse = selected?.totalHolding || 0;
      }
      const sellRatio = sellAmountToUse / selected?.totalHolding || 0;

      const stcgGainToConsider = (selected?.stcg?.gain || 0) * sellRatio;
      const ltcgGainToConsider = (selected?.ltcg?.gain || 0) * sellRatio;

      console.log("STCG Gain to consider:", stcgGainToConsider);
      console.log("LTCG Gain to consider:", ltcgGainToConsider);

      if (stcgGainToConsider > 0) {
        adjStcgProfits += stcgGainToConsider;
      } else {
        adjStcgLosses += Math.abs(stcgGainToConsider);
      }

      if (ltcgGainToConsider > 0) {
        adjLtcgProfits += ltcgGainToConsider;
      } else {
        adjLtcgLosses += Math.abs(ltcgGainToConsider);
      }
    });

    setAfterHarvestingGains({
      capitalGains: {
        stcg: { profits: adjStcgProfits, losses: adjStcgLosses },
        ltcg: { profits: adjLtcgProfits, losses: adjLtcgLosses },
      },
    });
    console.log("New afterHarvestingGains:", afterHarvestingGains);
  }, [selectedHoldings, preHarvestingGains]);

  return (
    <div className="app-container">
      <h1>Tax Optimisation</h1>
      <div className="cards-container">
        <CapitalGainsCard
          preHarvesting={preHarvestingGains}
          afterHarvesting={afterHarvestingGains}
        />
      </div>
      <HoldingsTable onSelectionChange={handleHoldingSelection} />
    </div>
  );
}

export default App;