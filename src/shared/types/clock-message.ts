import { MessageInterval } from './message-interval.type';
import { MessagesConfig } from './messages-config.type';

export type ClockMessage = {
  seconds: number;
  message: string;
  type: MessageInterval;
  currentMessages: MessagesConfig | undefined;
};
