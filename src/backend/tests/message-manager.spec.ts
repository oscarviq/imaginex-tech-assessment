import { MessageManager, TimeManager } from '@backend/classes';
import { MessagesConfig } from '@shared/types';

describe('MessageManager', () => {
  let messageManager: MessageManager;
  let timeManager: TimeManager;
  let consoleSpy: jest.SpyInstance;

  const mockMessagesConfig: MessagesConfig = {
    second: 'fizz',
    minute: 'buzz',
    hour: 'fizzbuzz'
  };

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    timeManager = new TimeManager();
    messageManager = new MessageManager(mockMessagesConfig, timeManager);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('Should return the current message settings', () => {
    expect(messageManager.messages).toEqual(mockMessagesConfig);
  });

  test('Should print and return seconds message if ticks do not represent a full minute', () => {
    for (let i = 0; i < 30; i++) {
      timeManager.tick();
    }
    messageManager.print();
    const test = consoleSpy.mock.lastCall[0];
    expect(test).toContain('fizz');
    expect(messageManager.getCurrentMessage()).toEqual({ message : 'fizz', type: 'second' });
  });

  test('Should print and return minutes message if ticks represent a full minute', () => {
    for (let i = 0; i < 60; i++) {
      timeManager.tick();
    }
    messageManager.print();
    const test = consoleSpy.mock.lastCall[0];
    expect(test).toContain('buzz');
    expect(messageManager.getCurrentMessage()).toEqual({ message : 'buzz', type: 'minute' });
  });

  test('Should print and return hours message if ticks represent a full hour', () => {
    for (let i = 0; i < 3600; i++) {
      timeManager.tick();
    }
    messageManager.print();
    const test = consoleSpy.mock.lastCall[0];
    expect(test).toContain('fizzbuzz');
    expect(messageManager.getCurrentMessage()).toEqual({ message : 'fizzbuzz', type: 'hour' });
  });

  test('Should update a message for a specific interval', () => {
    for (let i = 0; i < 10; i++) {
      timeManager.tick();
    }
    messageManager.print();

    const testCurrent = consoleSpy.mock.lastCall[0];
    expect(testCurrent).toContain('fizz');

    messageManager.updateMessage('second', 'yay');

    for (let i = 0; i < 10; i++) {
      timeManager.tick();
    }
    messageManager.print();

    const testUpdated = consoleSpy.mock.lastCall[0];
    expect(testUpdated).toContain('yay');
  });
});
