import { Server } from 'socket.io';

import { ClockConfig } from '@types';
import { FrontendSocketEvents, BackendSocketEvents } from '@shared/types';

import { TimeManager } from './time-manager';
import { MessageManager } from './message-manager';
import { InterfaceManager } from './interface-manager';

export class Clock {
  /**
   * TimeManager instance.
   * @private
   */
  private readonly _timeManager: TimeManager;

  /**
   * MessageManager instance.
   * @private
   */
  private readonly _messageManager: MessageManager;

  /**
   * InterfaceManager instance.
   * @private
   */
  private _interfaceManager: InterfaceManager;

  /**
   * Interval reference.
   * @private
   */
  private _interval: NodeJS.Timeout | null = null;

  /**
   * Timeout reference.
   * @private
   */
  private _timeout: NodeJS.Timeout | null = null;

  /**
   * Socket.io instance.
   * @private
   */
  private _io: Server<FrontendSocketEvents, BackendSocketEvents> | null = null;

  /**
   * Clock constructor.
   * @param _config
   */
  constructor(
    private _config: ClockConfig
  ) {
    this._timeManager = new TimeManager();
    this._messageManager = new MessageManager(this._config.messages, this._timeManager);
    this._interfaceManager = new InterfaceManager(this._messageManager);
  }

  /**
   * Sets the interval that ticks the time manager and prints the message.
   * @private
   */
  private setInterval() {
    this._interval = setInterval(() => {
      this._timeManager.tick();

      if (this._io) {
        this._io.emit('tick', {
          seconds: this._timeManager.ticks,
          ...this._messageManager.getCurrentMessage()
        });
      }

      if (!this._interfaceManager.active) {
        this._messageManager.print();
      }
    }, 1000);
  }

  /**
   * Sets the timeout that stops the clock after the duration.
   * @private
   */
  private setTimeout() {
    this._timeout = setTimeout(() => this.stop(), this._config.duration + 1000);
  }

  public withSockets(io: Server): Clock {
    if (!this._io) this._io = io;
    return this;
  }

  /**
   * Starts the clock.
   */
  public start(): void {
    this._interfaceManager.start();
    this.setInterval();
    this.setTimeout();
  }

  /**
   * Stops the clock and resets the time manager ticks.
   */
  public stop(): void {
    this._timeManager.reset();
    clearInterval(this._interval as NodeJS.Timeout);
    clearTimeout(this._timeout as NodeJS.Timeout);
    this._interfaceManager.stop();
  }
}
