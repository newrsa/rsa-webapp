import React from 'react';

export const BluebookView: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-[#faf9f5]">
      <div className="flex flex-col items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className="w-[200px] h-[200px]">
          <rect width="200" height="200" fill="#0E0F13"></rect>
          <rect x="60" y="60" width="80" height="80" rx="12" fill="#3355F6"></rect>
          <text x="100" y="108" fontFamily="sans-serif" fontSize="24" fontWeight="700" fill="#fff" textAnchor="middle">BB</text>
        </svg>
        <div className="mt-4 text-[#666] font-['Outfit',sans-serif]">Waiting for Bluebook extraction...</div>
      </div>
    </div>
  );
};
