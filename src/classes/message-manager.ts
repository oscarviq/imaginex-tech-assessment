import Chalk from 'chalk';
import { MessageInterval, MessagesConfig } from '@types';
import { TimeManager } from './time-manager';

export class MessageManager {
  /**
   * Messages to be printed.
   * @private
   */
  private _messages: MessagesConfig;

  /**
   * Map of message intervals to chalk colors.
   * @private
   */
  private _logMap: { [key in MessageInterval]: Chalk.Chalk } = { second: Chalk.green, minute: Chalk.yellow, hour: Chalk.red }

  /**
   * MessageManager constructor.
   * @param _initialMessages
   * @param _timeManager
   */
  constructor(
    private readonly _initialMessages: MessagesConfig = { second: 'tick', minute: 'tock', hour: 'bong' },
    private readonly _timeManager: TimeManager
  ) {
    this._messages = this._initialMessages;
  }

  /**
   * Prints the message based on the currently elapsed time.
   */
  public print(): void {
    if (this._timeManager.isFullHour) {
      console.log(this._logMap['hour'](this._messages['hour']))
    } else if (this._timeManager.isFullMinute) {
      console.log(this._logMap['minute'](this._messages['minute']))
    } else {
      console.log(this._logMap['second'](this._messages['second']))
    }
  }

  public updateMessage(type: MessageInterval, newMessage: string): void {
    this._messages[type] = newMessage;
  }
}
