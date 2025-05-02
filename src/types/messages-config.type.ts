import { MessageInterval } from './message-interval.type';

export type MessagesConfig = {
  [key in MessageInterval]: string;
};
