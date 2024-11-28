import React from 'react';
import { Sidebar } from './components/layout/Sidebar';

function App() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-semibold text-gray-900">Welcome to ProhostAI</h1>
      </main>
    </div>
  );
}

export default App;