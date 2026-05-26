// File: src/components/common/Btn3D.jsx
import React from 'react';

const Btn3D = ({ onClick, disabled, className, children, color = 'bg-white', shadow = 'border-slate-800' }) => (
  <button 
    onClick={onClick} 
    disabled={disabled} 
    className={`relative inline-flex items-center justify-center font-black transition-all rounded-2xl border-[4px] ${shadow} px-6 py-4 ${disabled ? 'opacity-50 translate-y-[4px] border-b-[4px] cursor-not-allowed' : 'hover:-translate-y-1 active:translate-y-[4px] border-b-[8px] active:border-b-[4px]'} ${color} ${className}`}
  >
    {children}
  </button>
);

export default Btn3D;
