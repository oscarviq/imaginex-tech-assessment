import { MessagesConfig } from './messages-config.type';

export type FrontendSocketEvents = {
  update: (arg: MessagesConfig) => void;
};
