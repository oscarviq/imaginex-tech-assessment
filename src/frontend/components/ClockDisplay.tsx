import React from 'react';

import { MessageInterval, MessagesConfig } from '@shared/types';
import { UpdateDialog } from '@frontend/components';

export type ClockDisplayProps = {
  message: string,
  type: MessageInterval,
  seconds: number | undefined,
  currentMessages: MessagesConfig | undefined;
};

const messageTypeColorMapper: { [key in MessageInterval]: string } = {
  second: 'text-green-500',
  minute: 'text-yellow-500',
  hour: 'text-red-500'
};

const formatDuration = (seconds: number): string => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  const parts = [];

  if (h > 0) parts.push(`${h}h`);
  if (m > 0) parts.push(`${m}m`);
  if (s > 0 || parts.length === 0) parts.push(`${s}s`);

  return parts.join(' ');
}

export default function ClockDisplay({ seconds, message, type, currentMessages }: ClockDisplayProps) {

  const dialog: HTMLDialogElement | null = document.getElementById('messages-modal') as HTMLDialogElement;

  return (
    <div className="min-w-40 space-y-4 flex flex-col items-center">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className="size-16 stroke-gray-400">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
      </svg>

      <div className="w-full card bg-white shadow">
        <div className="card-body p-2 text-center font-bold uppercase">
          <span className={`animate-[pulse_1s_ease-in-out_infinite] ${type ? messageTypeColorMapper[type] : ''}`}>{ message || 'Pending...' }</span>
        </div>
      </div>

      { !!seconds && <div className="text-center text-gray-400 text-xs">{ formatDuration(seconds) } Elapsed</div> }

      { message && <>
        <div className="tooltip tooltip-bottom tooltip-primary" data-tip="Update Messages">
          <button className="btn btn-xs btn-primary btn-circle hover:opacity-75" onClick={ ()=> dialog?.showModal() }>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className="size-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"/>
            </svg>
          </button>
        </div>

        <UpdateDialog currentMessages={ currentMessages }/>
      </> }
    </div>
  );
}
