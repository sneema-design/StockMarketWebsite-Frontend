import React from 'react';
import { Activity, TrendingUp, TrendingDown, Globe } from 'lucide-react';

const Dashboard = ({ data, onSelect, selected }) => {
  return (
    <div className="sidebar">
      <div className="header-title">
        <Globe className="inline-block mr-2 text-accent" size={28} />
        Global Markets
      </div>

      <div className="flex flex-col gap-4">
        {data.map((market) => {
          const isUp = market.changePercent > 0;
          const TrendIcon = isUp ? TrendingUp : TrendingDown;
          const trendClass = isUp ? 'text-bullish' : 'text-bearish';
          const isSelected = selected === market.symbol;

          return (
            <div 
              key={market.symbol}
              className={`glass-panel market-card ${isSelected ? 'static-border-focus' : ''}`}
              onClick={() => onSelect(market.symbol)}
              style={isSelected ? { borderColor: isUp ? '#00e676' : '#ff1744' } : {}}
            >
              <div className="market-header">
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 600 }}>{market.name}</h3>
                  <span className="text-muted text-sm">{market.country} • {market.symbol}</span>
                </div>
                <TrendIcon className={trendClass} size={24} />
              </div>
              
              <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                  <div className={`market-price ${trendClass}`}>
                    {market.price ? market.price.toLocaleString(undefined, { minimumFractionDigits: 2 }) : '---'}
                  </div>
                  <div className={`market-change ${trendClass}`}>
                    {isUp ? '+' : ''}{market.change?.toFixed(2)} ({isUp ? '+' : ''}{market.changePercent?.toFixed(2)}%)
                  </div>
                </div>
                
                <div className="ai-sentiment">
                  <Activity size={14} className="inline mr-1" />
                  {market.sentiment}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
