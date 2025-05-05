import React from 'react';

export default function Connecting() {

  return (
    <div className="min-w-40 space-y-2 flex flex-col items-center">
      <svg data-testid="spinning-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className="size-10 stroke-gray-400 animate-spin">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
      </svg>

      <div className="text-center text-gray-400 text-xs">Connecting...</div>
    </div>
  );
}
