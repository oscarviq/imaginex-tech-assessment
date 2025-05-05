import { EventEmitter } from 'events';
import { Server } from 'socket.io';
import { BackendSocketEvents, FrontendSocketEvents } from '@shared/types';

EventEmitter.defaultMaxListeners = 20;

export const mockSocketIO = {
  emit: jest.fn(),
  on: jest.fn(),
  removeAllListeners: jest.fn(),
} as unknown as Server<FrontendSocketEvents, BackendSocketEvents>;
