import { io, Socket } from 'socket.io-client';
import { BackendSocketEvents, FrontendSocketEvents } from '@shared/types';

const socket: Socket<BackendSocketEvents, FrontendSocketEvents> = io('http://localhost:3000', { reconnectionAttempts: 4 });

export default socket;
