import React from 'react';
import { useSocket } from './hooks/useSocket';
import Dashboard from './components/Dashboard';

function App() {
  const { items, placeBid, error, socketId } = useSocket();

  return (
    <div className="min-h-screen bg-gray-50">
      {error && (
        <div className="fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-xl z-50 animate-bounce">
          {error}
        </div>
      )}

      <Dashboard items={items} placeBid={placeBid} socketId={socketId} />
    </div>
  );
}

export default App;
