export class TimeManager {
  /**
   * Number of ticks elapsed.
   * @private
   */
  private _ticks: number;

  /**
   * TimeManager constructor.
   */
  constructor() {
    this._ticks = 0;
  }

  /**
   * Increments the tick count.
   */
  public tick(): void {
    this._ticks++;
  }

  /**
   * Returns the number of ticks elapsed.
   * @returns {number} The number of ticks elapsed.
   */
  public get ticks(): number {
    return this._ticks;
  }

  /**
  * Resets the tick count.
  */
  public reset(): void {
    this._ticks = 0;
  }

  /**
   * Returns true if the elapsed time is a full minute.
   * @returns {boolean} true if the elapsed time is a full minute; otherwise, false.
   */
  public get isFullMinute(): boolean {
    return this._ticks % 60 === 0;
  }

  /**
   * Returns true if the elapsed time is a full hour.
   * @returns {boolean} true if the elapsed time is a full hour; otherwise, false.
   */
  public get isFullHour(): boolean {
    return this._ticks % 3600 === 0;
  }
}
