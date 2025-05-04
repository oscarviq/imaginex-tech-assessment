import Chalk from 'chalk';

import { MessageInterval } from '@shared/types';
import { MessagesConfig } from '@types';
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
   * Gets the specific message type for the currently elapsed time.
   */
  public getCurrentMessage(): { message: string; type: MessageInterval } {
    if (this._timeManager.isFullHour) {
      return {
        message: this._messages['hour'],
        type: 'hour'
      };
    } else if (this._timeManager.isFullMinute) {
      return {
        message: this._messages['minute'],
        type: 'minute'
      };
    } else {
      return {
        message: this._messages['second'],
        type: 'second'
      };
    }
  }

  /**
   * Prints the message based on the currently elapsed time.
   */
  public print(): void {
    if (this._timeManager.isFullHour) {
      console.log(this._logMap['hour'](this._messages['hour']));
    } else if (this._timeManager.isFullMinute) {
      console.log(this._logMap['minute'](this._messages['minute']));
    } else {
      console.log(this._logMap['second'](this._messages['second']));
    }
  }

  /**
   * Updates the message for a specific message type with the provided content.
   * @param type
   * @param newMessage
   */
  public updateMessage(type: MessageInterval, newMessage: string): void {
    this._messages[type] = newMessage;
  }
}
