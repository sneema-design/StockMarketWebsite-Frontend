import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import GlobeWidget from './components/GlobeWidget.jsx';
import Dashboard from './components/Dashboard.jsx';
import ChartWidget from './components/ChartWidget.jsx';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || window.location.origin;

function App() {
  const [marketData, setMarketData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMarket, setSelectedMarket] = useState(null);

  useEffect(() => {
    // Connect to WebSocket AI feed
    const socket = io(SOCKET_URL);
    
    socket.on('connect', () => {
      console.log('Connected to market feed API');
    });

    socket.on('market-updates', (payload) => {
      setMarketData(payload);
      setLoading(false);
    });

    return () => socket.disconnect();
  }, []);

  return (
    <div className="app-container">
      {/* Loading State Overlay */}
      {loading && (
        <div className="loading-overlay">
          <h2>Initializing AI Aggregator Feed...</h2>
        </div>
      )}

      {/* Left Sidebar Dashboard */}
      <Dashboard 
        data={marketData} 
        onSelect={setSelectedMarket} 
        selected={selectedMarket} 
      />

      {/* Right 3D Globe Visualization */}
      <GlobeWidget 
        data={marketData} 
        selected={selectedMarket}
      />
      
      {/* Interactive Chart Widget overlay */}
      <ChartWidget selectedSymbol={selectedMarket} />
    </div>
  );
}

export default App;
