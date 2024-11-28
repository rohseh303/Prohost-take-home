import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/layout/Sidebar';
import { CalendarPage } from './components/layout/CalendarPage';

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-white">
        <Sidebar className="w-64" />
        <main className="flex-1 p-2 max-w-5xl mx-auto">
          <Routes>
            <Route path="/" element={
              <h1 className="text-2xl font-semibold text-gray-900">Select a page</h1>
            } />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="*" element={
              <h1 className="text-2xl font-semibold text-gray-900">Not implemented</h1>
            } />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;