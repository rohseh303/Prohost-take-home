import React from 'react';
import logo from '../assets/logo.jpeg';

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <img src={logo} alt="Custom Logo" className="w-8 h-8" />
      <span className="font-semibold text-xl">ProhostAI</span>
    </div>
  );
}