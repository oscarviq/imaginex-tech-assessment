import { MessageInterval } from './message-interval.type';

export type ClockMessage = {
  seconds: number;
  message: string;
  type: MessageInterval;
};
