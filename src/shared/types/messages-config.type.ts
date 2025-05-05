import { MessageInterval } from '@shared/types';

export type MessagesConfig = {
  [key in MessageInterval]: string;
};
