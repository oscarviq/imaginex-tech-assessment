import { TimeManager, MessageManager, InterfaceManager } from '@backend/classes';
import { MessagesConfig } from '@shared/types';

describe('InterfaceManager', () => {
  let interfaceManager: InterfaceManager;
  let timeManager: TimeManager;
  let messageManager: MessageManager;
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
    interfaceManager = new InterfaceManager(messageManager);
  });

  afterEach(() => {
    jest.restoreAllMocks();
    process.stdin.removeAllListeners('keypress');
  });

  test('Should start the interface and display initial messages', () => {
    interfaceManager.start();
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Clock Started!'));
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Press "Ctrl+u" to update messages. Press "Ctrl+c" to exit'));
  });

  test('Should stop the interface', () => {
    interfaceManager.start();
    (interfaceManager as any)._readline = { close: jest.fn() };
    interfaceManager.stop();
    expect((interfaceManager as any)._readline.close).toHaveBeenCalled();
  });

  test('Should handle Ctrl+u key press and request message change', () => {
    (interfaceManager as any)._readline = { question: jest.fn() };
    interfaceManager.start();
    const keyHandler = process.stdin.listeners('keypress')[0];
    keyHandler('', { name: 'u', ctrl: true }); // Simulate Ctrl+u press
    expect(interfaceManager.active).toBe(true);
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Clock is running in the background'));
    expect((interfaceManager as any)._readline.question).toHaveBeenCalled();
  });

  test('Should handle Ctrl+c key press and exit', () => {
    const exitSpy = jest.spyOn(process, 'exit').mockImplementation(() => undefined as never);
    (interfaceManager as any)._readline = { close: jest.fn() };
    interfaceManager.start();
    const keyHandler = process.stdin.listeners('keypress')[0];
    keyHandler('', { name: 'c', ctrl: true }); // Simulate Ctrl+c press
    expect(exitSpy).toHaveBeenCalled();
    expect((interfaceManager as any)._readline.close).toHaveBeenCalled();
  });

  test('Should update message when valid input is provided', () => {
    (interfaceManager as any)._readline = { question: jest.fn(), close: jest.fn() };
    (interfaceManager as any)._messageManager.updateMessage = jest.fn();
    interfaceManager.start();
    const keyHandler = process.stdin.listeners('keypress')[0];
    keyHandler('', { name: 'u', ctrl: true }); // Simulate Ctrl+u press
    const questionCallback = (interfaceManager as any)._readline.question.mock.calls[0][1];
    questionCallback('second:new message');
    expect((interfaceManager as any)._messageManager.updateMessage).toHaveBeenCalledWith('second', 'new message');
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Message Updated!'));
  });

  test('Should show error for invalid input format', () => {
    (interfaceManager as any)._readline = { question: jest.fn(), close: jest.fn() };
    (interfaceManager as any)._messageManager.updateMessage = jest.fn();
    interfaceManager.start();
    const keyHandler = process.stdin.listeners('keypress')[0];
    keyHandler('', { name: 'u', ctrl: true }); // Simulate Ctrl+u press
    const questionCallback = (interfaceManager as any)._readline.question.mock.calls[0][1];
    questionCallback('invalid:format');
    expect((interfaceManager as any)._messageManager.updateMessage).not.toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Invalid Input'));
  });
});
