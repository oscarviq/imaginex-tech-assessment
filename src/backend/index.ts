import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

import { FrontendSocketEvents, BackendSocketEvents } from '@shared/types';
import { Clock } from '@backend/classes';

const app = express();
const server = http.createServer(app);

const allowedOrigins = ['http://localhost:5173', 'http://localhost:8080', 'http://localhost'];
const io = new Server<FrontendSocketEvents, BackendSocketEvents>(server, {
  cors: {
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
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
