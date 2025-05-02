import Chalk from 'chalk';
import readline, { Interface } from 'readline';

export class InterfaceManager {
  /**
   * Whether the interface is active.
   */
  public active: boolean = false;

  /**
   * Readline interface.
   * @private
   */
  private _readline: Interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: ''
  });

  private _prompt: string = Chalk.blue('Press "Ctrl+u" to update messages. Press "Ctrl+c" to exit');

  /**
   * InterfaceManager constructor.
   * @param _messageManager
   */
  constructor(
    private readonly _messageManager: any
  ) {}

  /**
   * Starts the command line interface.
   */
  public start(): void {
    console.log(Chalk.cyan('Clock Started!'));
    console.log(Chalk.blue(this._prompt));
    if (process.stdin.isTTY) process.stdin.setRawMode(true);
    process.stdin.once('keypress', this.handleKey.bind(this));
    readline.emitKeypressEvents(process.stdin);
  }

  /**
   * Handles key presses.
   * @param str
   * @param key
   * @private
   */
  private handleKey(str: string, key: readline.Key) {
    if (key.name === 'c' && key.ctrl) process.exit();
    if (key.name === 'u' && key.ctrl) this.requestMessageChange();
  }

  private requestMessageChange() {
    this.active = true;

    const background = Chalk.blackBright('Clock is running in the background.');
    const prompt = Chalk.magentaBright('Change Message (FORMAT: second|minute|hour:<message>): ');
    const error = Chalk.redBright('Invalid Input. (FORMAT: second|minute|hour:<message>)');
    const exit = Chalk.blue(this._prompt);

    console.log(background);

    this._readline.question(prompt, (input: string) => {
      const [unit, message] = input.split(':');

      if (['second', 'minute', 'hour'].includes(unit.trim())) {
        this._messageManager.updateMessage(unit as 'second' | 'minute' | 'hour', message.trim());
        console.log(Chalk.greenBright('Message Updated!'));
      } else {
        console.log(error);
      }

      console.log(Chalk.blue(exit));
      process.stdin.once('keypress', this.handleKey.bind(this));
      this.active = false;
    });
  }
}
