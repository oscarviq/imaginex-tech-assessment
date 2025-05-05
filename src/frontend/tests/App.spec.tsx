import React from 'react';
import { render, act, waitFor, screen } from '@testing-library/react';
import { describe, afterEach, vi, test, expect } from 'vitest';

import App from '../App';
import { Socket } from '@frontend/utils';
import { ClockMessage } from '@shared/types';

vi.mock('@frontend/utils', () => ({
  Socket: {
    on: vi.fn(),
    removeAllListeners: vi.fn(),
  },
}));

describe('App Component', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test('Shows connecting state initially', () => {
    render(<App />);
    expect(screen.getByText('Connecting...')).toBeInTheDocument();
  });

  test('Shows connected state when socket connects', async () => {
    render(<App />);

    // Simulate socket connection
    const connectCall = (Socket.on as ReturnType<typeof vi.fn>).mock.calls.find(call => call[0] === 'connect');
    if (!connectCall) throw new Error('Connect callback not found');

    await act(async () => {
      connectCall[1]();
    });

    await waitFor(() => {
      expect(screen.getByText('Pending...')).toBeInTheDocument();
    });
  });

  test('Shows disconnected state when socket disconnects', async () => {
    render(<App />);

    // Simulate socket disconnection
    const disconnectCall = (Socket.on as ReturnType<typeof vi.fn>).mock.calls.find(call => call[0] === 'disconnect');
    if (!disconnectCall) throw new Error('Disconnect callback not found');

    await act(async () => {
      disconnectCall[1]();
    });

    await waitFor(() => {
      expect(screen.getByText('Disconnected')).toBeInTheDocument();
    });
  });

  test('Shows error state when socket has connection error', async () => {
    render(<App />);

    // Simulate socket error
    const errorCall = (Socket.on as ReturnType<typeof vi.fn>).mock.calls.find(call => call[0] === 'connect_error');
    if (!errorCall) throw new Error('Error callback not found');

    await act(async () => {
      errorCall[1]();
    });

    await waitFor(() => {
      expect(screen.getByText('Error')).toBeInTheDocument();
    });
  });

  test('Updates clock state when receiving tick event', async () => {
    render(<App />);

    // Simulate socket connection first
    const connectCall = (Socket.on as ReturnType<typeof vi.fn>).mock.calls.find(call => call[0] === 'connect');
    if (!connectCall) throw new Error('Connect callback not found');

    await act(async () => {
      connectCall[1]();
    });

    // Simulate tick event
    const mockClockMessage: ClockMessage = {
      message: 'fizz',
      type: 'second',
      seconds: 5,
      currentMessages: {
        second: 'fizz',
        minute: 'buzz',
        hour: 'fizzbuzz'
      }
    };

    const tickCall = (Socket.on as ReturnType<typeof vi.fn>).mock.calls.find(call => call[0] === 'tick');
    if (!tickCall) throw new Error('Tick callback not found');

    await act(async () => {
      tickCall[1](mockClockMessage);
    });

    await waitFor(() => {
      expect(screen.getByText('fizz')).toBeInTheDocument();
    });
  });

  test('Cleans up socket listeners on unmount', () => {
    const { unmount } = render(<App />);
    unmount();
    expect(Socket.removeAllListeners).toHaveBeenCalled();
  });
});
