import { mockSocketIO } from './__mocks__/socket';

import { Clock } from '@backend/classes';
import { ClockConfig } from '@shared/types';

describe('Clock', () => {
  let clock: Clock;
  let consoleSpy: jest.SpyInstance;

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
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.useRealTimers();
    clock.stop();
  });

  test('Should add a SocketIO instance if withSockets is called', () => {
    clock = new Clock(mockConfig);
    clock.withSockets(mockSocketIO).start();
    expect((clock as any)._io).toBe(mockSocketIO);
    expect(mockSocketIO.on).toHaveBeenCalledWith('connection', expect.any(Function));
  });

  test('Should start the InterfaceManager', () => {
    clock = new Clock(mockConfig);
    const startSpy = jest.spyOn((clock as any)._interfaceManager, 'start');
    clock.start();
    expect(startSpy).toHaveBeenCalled();
  });

  test('Should set an interval to tick the time manager', () => {
    const setIntervalSpy = jest.spyOn(globalThis, 'setInterval');
    clock = new Clock(mockConfig);
    clock.start();
    const interval = Object.getOwnPropertyDescriptor(clock, '_interval');
    expect(interval?.value).toBeTruthy();
    expect(setIntervalSpy).toHaveBeenCalled();
  });

  test('Should set a timeout to stop the clock after the set duration', () => {
    const setTimeoutSpy = jest.spyOn(globalThis, 'setTimeout');
    clock = new Clock(mockConfig);
    clock.start();
    const timeout = Object.getOwnPropertyDescriptor(clock, '_timeout');
    expect(timeout?.value).toBeTruthy();
    expect(setTimeoutSpy).toHaveBeenCalled();
  });

  test('Should call TimeManager.tick() on each iteration of the interval', () => {
    clock = new Clock(mockConfig);
    clock.start();
    const tickSpy = jest.spyOn((clock as any)._timeManager, 'tick');
    jest.advanceTimersByTime(10 * 1000);
    expect(tickSpy).toHaveBeenCalledTimes(10);
  });

  test('Should emit a socket on each iteration of the interval if the clock was built with withSockets', () => {
    clock = new Clock(mockConfig);
    clock.withSockets(mockSocketIO).start();
    jest.advanceTimersByTime(10 * 1000);
    expect(mockSocketIO.emit).toHaveBeenCalledWith('tick', expect.any(Object));
    expect(mockSocketIO.emit).toHaveBeenCalledTimes(10);
  });

  test('Should call InterfaceManager.print() on each iteration of the interval', () => {
    clock = new Clock(mockConfig);
    clock.start();
    const printSpy = jest.spyOn((clock as any)._messageManager, 'print');
    jest.advanceTimersByTime(10 * 1000);
    expect(printSpy).toHaveBeenCalledTimes(10);
  });

  test('Should print seconds message every second', () => {
    clock = new Clock(mockConfig);
    clock.start();
    jest.advanceTimersByTime(1000);
    expect(consoleSpy.mock.lastCall![0]).toContain('fizz');
  });

  test('Should print minutes message every minute', () => {
    clock = new Clock(mockConfig);
    clock.start();
    jest.advanceTimersByTime(6 * 10 * 1000);
    expect(consoleSpy.mock.lastCall![0]).toContain('buzz');
  });

  test('Should print hours message every hour', () => {
    clock = new Clock(mockConfig);
    clock.start();
    jest.advanceTimersByTime(60 * 60 * 1000);
    expect(consoleSpy.mock.lastCall![0]).toContain('fizzbuzz');
  });

  test('Should not print messages if interface manager is active', () => {
    clock = new Clock(mockConfig);
    clock.start();
    (clock as any)._interfaceManager.active = true;
    jest.advanceTimersByTime(60 * 60 * 1000);

    const tests = consoleSpy.mock.calls.map((log) => {
      return log.includes('fizz') || log.includes('buzz') || log.includes('fizzbuzz');
    });

    expect(tests).not.toContain(true);
  });

  test('Should clear the timeout and interval when the clock is stopped', () => {
    const clearIntervalSpy = jest.spyOn(globalThis, 'clearInterval');
    const clearTimeoutSpy = jest.spyOn(globalThis, 'clearTimeout');
    clock = new Clock(mockConfig);
    clock.start();
    clock.stop();
    expect(clearIntervalSpy).toHaveBeenCalled();
    expect(clearTimeoutSpy).toHaveBeenCalled();
  });

  test('Should remove all listeners from the socket when the clock is stopped', () => {
    clock = new Clock(mockConfig);
    clock.withSockets(mockSocketIO).start();
    jest.advanceTimersByTime(10 * 1000);
    clock.stop();
    expect(mockSocketIO.removeAllListeners).toHaveBeenCalled();
  });

  test('Should stop the interface manager when the clock is stopped', () => {
    clock = new Clock(mockConfig);
    const stopSpy = jest.spyOn((clock as any)._interfaceManager, 'stop');
    clock.start();
    jest.advanceTimersByTime(10 * 1000);
    clock.stop();
    expect(stopSpy).toHaveBeenCalled();
  });
});
