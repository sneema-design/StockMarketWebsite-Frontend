import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const ChartWidget = ({ selectedSymbol }) => {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    if (!selectedSymbol) return;
    
    const baseUrl = import.meta.env.VITE_API_URL || window.location.origin;
    fetch(`${baseUrl}/api/stocks/${encodeURIComponent(selectedSymbol)}/history`)
      .then(res => res.json())
      .then(history => {
        // Map data for Recharts
        const chartData = history.map(item => ({
          time: new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          price: parseFloat(item.price)
        }));
        setData(chartData);
      })
      .catch(err => console.error("Error fetching history:", err));
  }, [selectedSymbol]);

  if (!selectedSymbol) return null;

  return (
    <div className="glass-panel" style={{ position: 'absolute', bottom: '2rem', right: '2rem', width: '600px', height: '300px', zIndex: 100 }}>
      <h3 style={{ marginBottom: '1rem', color: '#fff', fontSize: '1.2rem' }}>Live History: {selectedSymbol}</h3>
      <ResponsiveContainer width="100%" height="80%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00e676" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#00e676" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} />
          <YAxis stroke="#94a3b8" fontSize={12} domain={['auto', 'auto']} tickFormatter={(tick) => tick.toFixed(2)} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#09090b', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}
            itemStyle={{ color: '#00e676' }}
          />
          <Area type="monotone" dataKey="price" stroke="#00e676" fillOpacity={1} fill="url(#colorPrice)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartWidget;
