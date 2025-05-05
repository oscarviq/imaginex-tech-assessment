import React, { useState, useReducer, useEffect } from 'react';
import { Socket as S } from 'socket.io-client';

import { ClockMessage } from '@shared/types';
import { Socket } from '@frontend/utils';
import { ClockDisplay, Connecting, Disconnected, Error } from '@frontend/components';

const initialClockState: ClockMessage = { message: '', type: 'second', seconds: 0, currentMessages: undefined };
const clockStateReducer = (oldState: ClockMessage, newState: ClockMessage) => newState;

export default function App() {
  const [socketState, setSocketState] = useState<string>('connecting');
  const [clockState, clockStateDispatch] = useReducer(clockStateReducer, initialClockState);

  useEffect(() => {
    Socket.on('connect', () => setSocketState('connected'));
    (Socket as S).on('reconnect', () => setSocketState('connected'));

    Socket.on('disconnect', () => setSocketState('disconnected'));
    (Socket as S).on('close', () => setSocketState('disconnected'));
    (Socket as S).on('connect_error', () => setSocketState('error'));

    Socket.on('tick', (event: ClockMessage) => clockStateDispatch(event));

    return () => {
      Socket.removeAllListeners();
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      { socketState === 'connecting' && <Connecting /> }
      { socketState === 'disconnected' && <Disconnected /> }
      { socketState === 'error' && <Error /> }
      { socketState === 'connected' && <ClockDisplay {...clockState} /> }
    </div>
  );
}
