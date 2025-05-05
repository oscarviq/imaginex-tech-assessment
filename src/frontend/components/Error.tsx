import React from 'react';

export default function Disconnected() {

  return (
    <div className="min-w-40 space-y-2 flex flex-col items-center">
      <svg data-testid="icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className="size-10 stroke-gray-400">
        <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>

      <div className="text-center text-gray-400 text-xs">Error</div>
    </div>
  );
}
