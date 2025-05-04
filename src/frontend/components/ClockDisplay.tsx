import React from 'react';

import { MessageInterval } from '@shared/types';

export type ClockDisplayProps = {
  message: string,
  type?: MessageInterval,
  seconds: number | undefined
}

const messageTypeColorMapper: { [key in MessageInterval]: string } = {
  second: 'text-green-500',
  minute: 'text-yellow-500',
  hour: 'text-red-500'
};

export default function ClockDisplay({ seconds, message, type }: ClockDisplayProps) {

  return (
    <div className="min-w-40 space-y-2 flex flex-col items-center">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className="size-10 stroke-gray-400">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>

      <div className="w-full card bg-white shadow">
        <div className="card-body p-2 text-center font-bold uppercase">
          <span className={ `animate-[pulse_1s_ease-in-out_infinite] ${ type ? messageTypeColorMapper[type] : '' }` }>{ message }</span>
        </div>
      </div>

      { !!seconds && <div className="text-center text-gray-400 text-xs">{ seconds } Seconds Elapsed</div> }
    </div>
  );
}
