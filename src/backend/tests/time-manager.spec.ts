import { TimeManager } from '@classes';

describe('TimeManager', () => {
  let timeManager: TimeManager;

  beforeEach(() => {
    timeManager = new TimeManager();
  });

  test('Should have no ticks if it has not been ticked', () => {
    expect(timeManager.ticks).toEqual(0);
  });

  test('Should return ticks equal to the amount of times it has been ticked', () => {
    timeManager.tick();
    timeManager.tick();
    timeManager.tick();
    expect(timeManager.ticks).toEqual(3);
  });

  test('Should reset the amount of ticks', () => {
    timeManager.tick();
    timeManager.tick();
    timeManager.tick();
    timeManager.reset();
    expect(timeManager.ticks).toEqual(0);
  });

  test('Should return true if the current tick represents a full minute', () => {
    for (let i = 0; i < (60 * 2); i++) {
      timeManager.tick();
    }
    expect(timeManager.isFullMinute).toEqual(true);
  });

  test('Should return false if the current tick does not represent a full minute', () => {
    for (let i = 0; i < 59; i++) {
      timeManager.tick();
    }
    expect(timeManager.isFullMinute).toEqual(false);
  });

  test('Should return true if the current tick represents a full hour', () => {
    for (let i = 0; i < (3600 * 3); i++) {
      timeManager.tick();
    }
    expect(timeManager.isFullHour).toEqual(true);
  });

  test('Should return false if the current tick does not represent a full hour', () => {
    for (let i = 0; i < (3600 * 3) - 1; i++) {
      timeManager.tick();
    }
    expect(timeManager.isFullHour).toEqual(false);
  });
});

