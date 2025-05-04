import { ClockMessage } from '@shared/types';

export type BackendSocketEvents = {
  tick: (arg: ClockMessage) => void;
};
