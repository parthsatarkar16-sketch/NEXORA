import Layout from '../components/Layout';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Simulated IoT sensor data across the city zones
const generateZoneData = () => ({
  traffic: Math.floor(Math.random() * 100),
  airQuality: Math.floor(Math.random() * 200) + 20,
  waterPressure: Math.floor(Math.random() * 30) + 70,
  powerLoad: Math.floor(Math.random() * 40) + 50,
  incidents: Math.floor(Math.random() * 5),
  temperature: Math.floor(Math.random() * 10) + 25,
});

const cityZones = [
  { id: 1, name: 'Central Business District', x: 45, y: 35, type: 'commercial' },
  { id: 2, name: 'Residential Sector North', x: 30, y: 20, type: 'residential' },
  { id: 3, name: 'Industrial Zone', x: 70, y: 45, type: 'industrial' },
  { id: 4, name: 'Healthcare Hub', x: 25, y: 55, type: 'healthcare' },
  { id: 5, name: 'Education District', x: 55, y: 25, type: 'education' },
  { id: 6, name: 'Transport Hub', x: 50, y: 60, type: 'transport' },
  { id: 7, name: 'Green Park Zone', x: 75, y: 25, type: 'recreation' },
  { id: 8, name: 'Residential Sector South', x: 35, y: 75, type: 'residential' },
  { id: 9, name: 'Smart Grid Station', x: 65, y: 70, type: 'utility' },
];

const DigitalTwin = () => {
  const [selectedZone, setSelectedZone] = useState(null);
  const [zoneData, setZoneData] = useState({});
  const [viewMode, setViewMode] = useState('heatmap'); // heatmap, traffic, airquality, power
  const [timeSlider, setTimeSlider] = useState(50); // 0-100 representing past to future
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeAlerts, setActiveAlerts] = useState([]);
  const [showPrediction, setShowPrediction] = useState(false);
  const mapRef = useRef(null);

  // Initialize zone data
  useEffect(() => {
    const initialData = {};
    cityZones.forEach(zone => {
      initialData[zone.id] = generateZoneData();
    });
    setZoneData(initialData);
  }, []);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setZoneData(prev => {
        const updated = { ...prev };
        const randomZoneId = Math.floor(Math.random() * cityZones.length) + 1;
        updated[randomZoneId] = generateZoneData();
        return updated;
      });

      // Randomly generate alerts
      if (Math.random() > 0.7) {
        const alertTypes = [
          { type: 'traffic', message: 'Heavy congestion detected', severity: 'warning', icon: '🚗' },
          { type: 'airquality', message: 'AQI spike in area', severity: 'danger', icon: '🌫️' },
          { type: 'power', message: 'High load warning', severity: 'warning', icon: '⚡' },
          { type: 'water', message: 'Pressure drop detected', severity: 'info', icon: '💧' },
          { type: 'incident', message: 'New incident reported', severity: 'danger', icon: '🚨' },
        ];
        const newAlert = {
          ...alertTypes[Math.floor(Math.random() * alertTypes.length)],
          id: Date.now(),
          zone: cityZones[Math.floor(Math.random() * cityZones.length)].name,
          time: new Date().toLocaleTimeString(),
        };
        setActiveAlerts(prev => [newAlert, ...prev].slice(0, 5));
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Time travel simulation
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setTimeSlider(prev => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 100;
          }
          return prev + 1;
        });
      }, 200);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  const getHeatmapColor = (zone) => {
    if (!zoneData[zone.id]) return 'rgba(59, 130, 246, 0.5)';
    
    const data = zoneData[zone.id];
    switch (viewMode) {
      case 'traffic':
        if (data.traffic > 80) return 'rgba(239, 68, 68, 0.8)';
        if (data.traffic > 50) return 'rgba(234, 179, 8, 0.7)';
        return 'rgba(34, 197, 94, 0.6)';
      case 'airquality':
        if (data.airQuality > 150) return 'rgba(139, 92, 246, 0.8)';
        if (data.airQuality > 100) return 'rgba(239, 68, 68, 0.7)';
        if (data.airQuality > 50) return 'rgba(234, 179, 8, 0.6)';
        return 'rgba(34, 197, 94, 0.6)';
      case 'power':
        if (data.powerLoad > 80) return 'rgba(239, 68, 68, 0.8)';
        if (data.powerLoad > 60) return 'rgba(234, 179, 8, 0.7)';
        return 'rgba(34, 197, 94, 0.6)';
      default:
        // Combined heatmap
        const combined = (data.traffic + data.airQuality / 2 + data.powerLoad) / 3;
        if (combined > 70) return 'rgba(239, 68, 68, 0.7)';
        if (combined > 50) return 'rgba(234, 179, 8, 0.6)';
        return 'rgba(34, 197, 94, 0.5)';
    }
  };

  const getZoneIcon = (type) => {
    const icons = {
      commercial: '🏢',
      residential: '🏠',
      industrial: '🏭',
      healthcare: '🏥',
      education: '🎓',
      transport: '🚉',
      recreation: '🌳',
      utility: '⚡',
    };
    return icons[type] || '📍';
  };

  const getTimeLabel = () => {
    const hours = Math.floor((timeSlider / 100) * 24);
    const minutes = Math.floor(((timeSlider / 100) * 24 - hours) * 60);
    const isPast = timeSlider < 50;
    const prefix = isPast ? 'Past: ' : timeSlider > 50 ? 'Predicted: ' : 'Now: ';
    return `${prefix}${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  const dismissAlert = (alertId) => {
    setActiveAlerts(prev => prev.filter(a => a.id !== alertId));
  };

  return (
    <Layout title="3D Digital Twin - NEXORA">
      <div className="min-h-screen bg-[var(--background-dark)]">
        <div className="container mx-auto px-4 py-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 text-transparent bg-clip-text">
                  🌐 Digital Twin - Nexora City
                </h1>
                <p className="text-[var(--text-secondary)] mt-1">
                  Real-time 3D visualization of city infrastructure and IoT sensor data
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-green-400">Live</span>
                </span>
                <span className="text-xs text-gray-500">|</span>
                <span className="text-xs text-gray-400">
                  Last updated: {new Date().toLocaleTimeString()}
                </span>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main Map Area */}
            <div className="lg:col-span-3">
              {/* View Mode Selector */}
              <div className="glass-card rounded-xl border border-gray-700/50 p-4 mb-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex gap-2">
                    {[
                      { id: 'heatmap', label: 'Combined', icon: '🗺️' },
                      { id: 'traffic', label: 'Traffic', icon: '🚗' },
                      { id: 'airquality', label: 'Air Quality', icon: '🌿' },
                      { id: 'power', label: 'Power Grid', icon: '⚡' },
                    ].map(mode => (
                      <button
                        key={mode.id}
                        onClick={() => setViewMode(mode.id)}
                        className={`px-4 py-2 rounded-lg flex items-center gap-2 text-sm transition-all ${
                          viewMode === mode.id
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                            : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                        }`}
                      >
                        <span>{mode.icon}</span>
                        <span>{mode.label}</span>
                      </button>
                    ))}
                  </div>
                  
                  <button
                    onClick={() => setShowPrediction(!showPrediction)}
                    className={`px-4 py-2 rounded-lg flex items-center gap-2 text-sm transition-all ${
                      showPrediction
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                    }`}
                  >
                    <span>🔮</span>
                    <span>AI Predictions</span>
                  </button>
                </div>
              </div>

              {/* 3D City Map */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card rounded-2xl border border-gray-700/50 overflow-hidden"
              >
                <div 
                  ref={mapRef}
                  className="relative h-[500px] bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800"
                  style={{
                    backgroundImage: `
                      linear-gradient(rgba(59, 130, 246, 0.05) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(59, 130, 246, 0.05) 1px, transparent 1px)
                    `,
                    backgroundSize: '50px 50px',
                  }}
                >
                  {/* City Grid Lines */}
                  <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.3 }}>
                    {/* Road network simulation */}
                    <line x1="10%" y1="50%" x2="90%" y2="50%" stroke="#3b82f6" strokeWidth="2" />
                    <line x1="50%" y1="10%" x2="50%" y2="90%" stroke="#3b82f6" strokeWidth="2" />
                    <line x1="25%" y1="10%" x2="25%" y2="90%" stroke="#3b82f6" strokeWidth="1" />
                    <line x1="75%" y1="10%" x2="75%" y2="90%" stroke="#3b82f6" strokeWidth="1" />
                    <line x1="10%" y1="25%" x2="90%" y2="25%" stroke="#3b82f6" strokeWidth="1" />
                    <line x1="10%" y1="75%" x2="90%" y2="75%" stroke="#3b82f6" strokeWidth="1" />
                  </svg>

                  {/* City Zones */}
                  {cityZones.map(zone => (
                    <motion.div
                      key={zone.id}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: zone.id * 0.1 }}
                      className={`absolute cursor-pointer transition-all duration-300 ${
                        selectedZone?.id === zone.id ? 'z-20' : 'z-10'
                      }`}
                      style={{
                        left: `${zone.x}%`,
                        top: `${zone.y}%`,
                        transform: 'translate(-50%, -50%)',
                      }}
                      onClick={() => setSelectedZone(selectedZone?.id === zone.id ? null : zone)}
                    >
                      {/* Heatmap Circle */}
                      <motion.div
                        animate={{
                          scale: selectedZone?.id === zone.id ? 1.3 : 1,
                          boxShadow: selectedZone?.id === zone.id 
                            ? '0 0 30px rgba(139, 92, 246, 0.5)' 
                            : '0 0 20px rgba(0, 0, 0, 0.3)',
                        }}
                        className="relative w-16 h-16 rounded-full flex items-center justify-center transition-all"
                        style={{ backgroundColor: getHeatmapColor(zone) }}
                      >
                        <span className="text-2xl">{getZoneIcon(zone.type)}</span>
                        
                        {/* Pulse animation for active zones */}
                        {zoneData[zone.id]?.incidents > 0 && (
                          <div className="absolute inset-0 rounded-full bg-red-500/50 animate-ping" />
                        )}
                      </motion.div>
                      
                      {/* Zone Label */}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 whitespace-nowrap">
                        <span className="text-xs font-medium text-gray-300 bg-gray-900/80 px-2 py-1 rounded">
                          {zone.name}
                        </span>
                      </div>
                    </motion.div>
                  ))}

                  {/* Selected Zone Info Panel */}
                  <AnimatePresence>
                    {selectedZone && zoneData[selectedZone.id] && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="absolute top-4 right-4 w-72 bg-gray-900/95 backdrop-blur-lg rounded-xl border border-gray-700 overflow-hidden z-30"
                      >
                        <div className="p-4 border-b border-gray-700 bg-gradient-to-r from-blue-900/50 to-purple-900/50">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-2xl">{getZoneIcon(selectedZone.type)}</span>
                              <div>
                                <h3 className="font-semibold text-sm">{selectedZone.name}</h3>
                                <span className="text-xs text-gray-400 capitalize">{selectedZone.type}</span>
                              </div>
                            </div>
                            <button 
                              onClick={() => setSelectedZone(null)}
                              className="text-gray-400 hover:text-white"
                            >
                              ✕
                            </button>
                          </div>
                        </div>
                        
                        <div className="p-4 space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-400">🚗 Traffic</span>
                            <div className="flex items-center gap-2">
                              <div className="w-20 h-2 bg-gray-700 rounded-full overflow-hidden">
                                <div 
                                  className={`h-full rounded-full ${
                                    zoneData[selectedZone.id].traffic > 80 ? 'bg-red-500' :
                                    zoneData[selectedZone.id].traffic > 50 ? 'bg-yellow-500' : 'bg-green-500'
                                  }`}
                                  style={{ width: `${zoneData[selectedZone.id].traffic}%` }}
                                />
                              </div>
                              <span className="text-sm font-medium">{zoneData[selectedZone.id].traffic}%</span>
                            </div>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-400">🌿 AQI</span>
                            <span className={`text-sm font-medium ${
                              zoneData[selectedZone.id].airQuality > 150 ? 'text-purple-400' :
                              zoneData[selectedZone.id].airQuality > 100 ? 'text-red-400' :
                              zoneData[selectedZone.id].airQuality > 50 ? 'text-yellow-400' : 'text-green-400'
                            }`}>
                              {zoneData[selectedZone.id].airQuality}
                            </span>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-400">💧 Water Pressure</span>
                            <span className="text-sm font-medium text-cyan-400">
                              {zoneData[selectedZone.id].waterPressure}%
                            </span>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-400">⚡ Power Load</span>
                            <span className="text-sm font-medium text-yellow-400">
                              {zoneData[selectedZone.id].powerLoad}%
                            </span>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-400">🌡️ Temperature</span>
                            <span className="text-sm font-medium">
                              {zoneData[selectedZone.id].temperature}°C
                            </span>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-400">🚨 Active Incidents</span>
                            <span className={`text-sm font-medium ${
                              zoneData[selectedZone.id].incidents > 0 ? 'text-red-400' : 'text-green-400'
                            }`}>
                              {zoneData[selectedZone.id].incidents}
                            </span>
                          </div>
                        </div>
                        
                        <div className="p-4 border-t border-gray-700">
                          <button className="w-full py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
                            View Detailed Analytics
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Map Legend */}
                  <div className="absolute bottom-4 left-4 bg-gray-900/90 backdrop-blur-sm rounded-lg p-3 border border-gray-700">
                    <h4 className="text-xs font-semibold mb-2 text-gray-400">Legend</h4>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span className="text-xs">Good</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <span className="text-xs">Moderate</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <span className="text-xs">High</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                        <span className="text-xs">Critical</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Time Slider */}
                <div className="p-4 bg-gray-900/80 border-t border-gray-700">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="w-10 h-10 rounded-full bg-purple-600 hover:bg-purple-500 flex items-center justify-center transition-colors"
                    >
                      {isPlaying ? '⏸️' : '▶️'}
                    </button>
                    
                    <div className="flex-1">
                      <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>Past (6h ago)</span>
                        <span className="font-medium text-purple-400">{getTimeLabel()}</span>
                        <span>Future (6h)</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={timeSlider}
                        onChange={(e) => setTimeSlider(parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
                      />
                    </div>
                  </div>
                  
                  <p className="text-xs text-center text-gray-500 mt-2">
                    🔮 Use the time slider to explore historical data or AI-predicted future states
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-1 space-y-4">
              {/* Live Alerts */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass-card rounded-xl border border-gray-700/50 overflow-hidden"
              >
                <div className="p-4 border-b border-gray-700 bg-gradient-to-r from-red-900/30 to-orange-900/30">
                  <h3 className="font-semibold flex items-center gap-2">
                    <span>🚨</span>
                    <span>Live Alerts</span>
                    {activeAlerts.length > 0 && (
                      <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                        {activeAlerts.length}
                      </span>
                    )}
                  </h3>
                </div>
                
                <div className="max-h-64 overflow-y-auto">
                  <AnimatePresence>
                    {activeAlerts.length === 0 ? (
                      <div className="p-4 text-center text-gray-500 text-sm">
                        ✅ No active alerts
                      </div>
                    ) : (
                      activeAlerts.map(alert => (
                        <motion.div
                          key={alert.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, height: 0 }}
                          className={`p-3 border-b border-gray-700/50 ${
                            alert.severity === 'danger' ? 'bg-red-900/20' :
                            alert.severity === 'warning' ? 'bg-yellow-900/20' : 'bg-blue-900/20'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-start gap-2">
                              <span className="text-lg">{alert.icon}</span>
                              <div>
                                <p className="text-sm font-medium">{alert.message}</p>
                                <p className="text-xs text-gray-400">{alert.zone}</p>
                                <p className="text-xs text-gray-500">{alert.time}</p>
                              </div>
                            </div>
                            <button 
                              onClick={() => dismissAlert(alert.id)}
                              className="text-gray-500 hover:text-white text-xs"
                            >
                              ✕
                            </button>
                          </div>
                        </motion.div>
                      ))
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* AI Predictions Panel */}
              {showPrediction && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass-card rounded-xl border border-purple-700/50 overflow-hidden"
                >
                  <div className="p-4 border-b border-gray-700 bg-gradient-to-r from-purple-900/30 to-pink-900/30">
                    <h3 className="font-semibold flex items-center gap-2">
                      <span>🔮</span>
                      <span>AI Predictions</span>
                    </h3>
                  </div>
                  
                  <div className="p-4 space-y-3">
                    <div className="bg-yellow-900/20 border border-yellow-700/50 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <span>🚗</span>
                        <span className="text-sm font-medium">Traffic Spike</span>
                      </div>
                      <p className="text-xs text-gray-400">Expected in Central Business District at 5:30 PM</p>
                      <div className="flex items-center gap-1 mt-2">
                        <span className="text-xs text-yellow-400">Confidence:</span>
                        <div className="flex-1 h-1 bg-gray-700 rounded-full">
                          <div className="h-full w-4/5 bg-yellow-500 rounded-full"></div>
                        </div>
                        <span className="text-xs text-yellow-400">87%</span>
                      </div>
                    </div>
                    
                    <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <span>⚡</span>
                        <span className="text-sm font-medium">Power Demand Peak</span>
                      </div>
                      <p className="text-xs text-gray-400">Industrial Zone will hit 95% capacity at 7:00 PM</p>
                      <div className="flex items-center gap-1 mt-2">
                        <span className="text-xs text-red-400">Confidence:</span>
                        <div className="flex-1 h-1 bg-gray-700 rounded-full">
                          <div className="h-full w-[92%] bg-red-500 rounded-full"></div>
                        </div>
                        <span className="text-xs text-red-400">92%</span>
                      </div>
                    </div>
                    
                    <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <span>💧</span>
                        <span className="text-sm font-medium">Maintenance Required</span>
                      </div>
                      <p className="text-xs text-gray-400">Water pump in Sector South needs attention within 48h</p>
                      <div className="flex items-center gap-1 mt-2">
                        <span className="text-xs text-blue-400">Confidence:</span>
                        <div className="flex-1 h-1 bg-gray-700 rounded-full">
                          <div className="h-full w-3/4 bg-blue-500 rounded-full"></div>
                        </div>
                        <span className="text-xs text-blue-400">78%</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="glass-card rounded-xl border border-gray-700/50 p-4"
              >
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <span>📊</span>
                  <span>City Overview</span>
                </h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Active Zones</span>
                    <span className="font-semibold text-green-400">{cityZones.length}/9</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">IoT Sensors Online</span>
                    <span className="font-semibold text-blue-400">12,847</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Data Points/sec</span>
                    <span className="font-semibold text-purple-400">2.4M</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">System Health</span>
                    <span className="font-semibold text-emerald-400">98.7%</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DigitalTwin;
