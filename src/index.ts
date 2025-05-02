import { Clock } from '@classes';

const clock = new Clock({
  duration: 3 * 60 * 60 * 1000, // 3 hours in milliseconds
  messages: {
    second: 'tick',
    minute: 'tock',
    hour: 'bong',
  }
});

clock.start();
