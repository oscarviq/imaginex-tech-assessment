import { Clock } from '@classes';
import { ClockConfig } from '@types';

describe('Clock', () => {
  let clock: Clock;
  let consoleSpy: jest.SpyInstance;
  let setIntervalSpy: jest.SpyInstance;
  let clearIntervalSpy: jest.SpyInstance;
  let setTimeoutSpy: jest.SpyInstance;
  let clearTimeoutSpy: jest.SpyInstance;

  const mockConfig: ClockConfig = {
    duration: 3 * 60 * 60 * 1000, // 1 hour in milliseconds
    messages: {
      second: 'fizz',
      minute: 'buzz',
      hour: 'fizzbuzz'
    }
  };

  beforeEach(() => {
    jest.useFakeTimers();

    consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    setIntervalSpy = jest.spyOn(globalThis, 'setInterval');
    clearIntervalSpy = jest.spyOn(globalThis, 'clearInterval');
    setTimeoutSpy = jest.spyOn(globalThis, 'setTimeout');
    clearTimeoutSpy = jest.spyOn(globalThis, 'clearTimeout');

    clock = new Clock(mockConfig);
    clock.start();
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.useRealTimers();
    clock.stop();
  });

  test('Should set an interval to tick the time manager', () => {
    const interval = Object.getOwnPropertyDescriptor(clock, '_interval');
    expect(interval?.value).toBeTruthy();
    expect(setIntervalSpy).toHaveBeenCalled();
  });

  test('Should set a timeout to stop the clock after the set duration', () => {
    const timeout = Object.getOwnPropertyDescriptor(clock, '_timeout');
    expect(timeout?.value).toBeTruthy();
    expect(setTimeoutSpy).toHaveBeenCalled();
  });

  test('Should print seconds message every second', () => {
    jest.advanceTimersByTime(1000);
    const test = consoleSpy.mock.lastCall[0];
    expect(test).toContain('fizz');
  });

  test('Should print minutes message every minute', () => {
    jest.advanceTimersByTime(6 * 10 * 1000);
    const test = consoleSpy.mock.lastCall[0];
    expect(test).toContain('buzz');
  });

  test('Should print hours message every hour', () => {
    jest.advanceTimersByTime(60 * 60 * 1000);
    const test = consoleSpy.mock.lastCall[0];
    expect(test).toContain('fizzbuzz');
  });

  test('Should not print messages if interface manager is active', () => {
    (clock as any)._interfaceManager.active = true;
    jest.advanceTimersByTime(60 * 60 * 1000);

    const tests = consoleSpy.mock.calls.map((log: string) => {
      return log.includes('fizz') &&
             log.includes('buzz') &&
             log.includes('fizzbuzz');
    });

    expect(tests).not.toContain(true);
  });

  test('Should clear the timeout and interval when the clock is stopped', () => {
    clock.stop();
    expect(clearIntervalSpy).toHaveBeenCalled();
    expect(clearTimeoutSpy).toHaveBeenCalled();
  });
});
