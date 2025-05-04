import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

import { FrontendSocketEvents, BackendSocketEvents } from '@shared/types';
import { Clock } from '@classes';

const app = express();
const server = http.createServer(app);

const io = new Server<FrontendSocketEvents, BackendSocketEvents>(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
});

server.listen(3000, async () => {
  const clock = new Clock({
    duration: 3 * 60 * 60 * 1000, // 3 hours in milliseconds
    messages: { second: 'tick', minute: 'tock', hour: 'bong' }
  });

  clock.withSockets(io).start();
});
