import React, { useState, useReducer, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

import { FrontendSocketEvents, BackendSocketEvents, ClockMessage } from '@shared/types';
import { ClockDisplay, Connecting, Disconnected, Error } from '@components';

const socket: Socket<BackendSocketEvents, FrontendSocketEvents> = io('http://localhost:3000', { reconnectionAttempts: 4 });
const initialClockState: ClockMessage = { message: 'Pending...', type: 'second', seconds: 0 };
const clockStateReducer = (oldState: ClockMessage, newState: ClockMessage) => newState;

export default function App() {
  const [socketState, setSocketState] = useState<string>('connecting');
  const [clockState, clockStateDispatch] = useReducer(clockStateReducer, initialClockState);

  useEffect(() => {
    socket.on('connect', () => setSocketState('connected'));
    (socket as Socket).on('reconnect', () => setSocketState('connected'));

    socket.on('disconnect', () => setSocketState('disconnected'));
    (socket as Socket).on('close', () => setSocketState('disconnected'));
    (socket as Socket).on('connect_error', () => setSocketState('error'));

    socket.on('tick', (event: ClockMessage) => clockStateDispatch(event));

    return () => {
      socket.removeAllListeners();
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
