import { MessageManager, TimeManager } from '@classes';
import { MessagesConfig } from '@types';

describe.only('MessageManager', () => {
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

  test('Should print seconds message if ticks do not represent a full minute', () => {
    for (let i = 0; i < 30; i++) {
      timeManager.tick();
    }
    messageManager.print();
    const test = consoleSpy.mock.lastCall[0];
    expect(test).toContain('fizz');
  });

  test('Should print minutes message if ticks represent a full minute', () => {
    for (let i = 0; i < 60; i++) {
      timeManager.tick();
    }
    messageManager.print();
    const test = consoleSpy.mock.lastCall[0];
    expect(test).toContain('buzz');
  });

  test('Should print hours message if ticks represent a full hour', () => {
    for (let i = 0; i < 3600; i++) {
      timeManager.tick();
    }
    messageManager.print();
    const test = consoleSpy.mock.lastCall[0];
    expect(test).toContain('fizzbuzz');
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

    const testNew = consoleSpy.mock.lastCall[0];
    expect(testNew).toContain('yay');
  });
});
