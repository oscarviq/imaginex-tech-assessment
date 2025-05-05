import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, afterEach, test, expect, vi } from 'vitest';

import UpdateDialog from '../components/UpdateDialog';
import { MessagesConfig } from '@shared/types';
import { Socket } from '@frontend/utils';

vi.mock('@frontend/utils', () => ({
  Socket: {
    emit: vi.fn(),
  },
}));

describe('UpdateDialog Component', () => {
  let mockDialog: HTMLDialogElement;

  const mockMessages: MessagesConfig = {
    second: 'fizz',
    minute: 'buzz',
    hour: 'fizzbuzz'
  };

  beforeEach(() => {
    mockDialog = { close: vi.fn() } as unknown as HTMLDialogElement;
    vi.spyOn(document, 'getElementById').mockReturnValue(mockDialog);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('Renders form with current messages', () => {
    render(<UpdateDialog currentMessages={ mockMessages } />);

    expect(screen.getByLabelText('Seconds')).toHaveValue(mockMessages.second);
    expect(screen.getByLabelText('Minutes')).toHaveValue(mockMessages.minute);
    expect(screen.getByLabelText('Hours')).toHaveValue(mockMessages.hour);
    expect(screen.getByTestId('cancel-button')).toBeInTheDocument();
    expect(screen.getByTestId('update-button')).toBeInTheDocument();
  });

  test('Closes dialog when cancel button is clicked', () => {
    render(<UpdateDialog currentMessages={ mockMessages } />);

    const cancelButton = screen.getByTestId('cancel-button');
    fireEvent.click(cancelButton);
    expect(mockDialog.close).toHaveBeenCalledWith('closed');
  });

  test('Emits socket event and closes dialog when form is submitted', () => {
    render(<UpdateDialog currentMessages={mockMessages} />);

    const secondInput = screen.getByLabelText('Seconds');
    const minuteInput = screen.getByLabelText('Minutes');
    const hourInput = screen.getByLabelText('Hours');

    fireEvent.change(secondInput, { target: { value: 'new-fizz' } });
    fireEvent.change(minuteInput, { target: { value: 'new-buzz' } });
    fireEvent.change(hourInput, { target: { value: 'new-fizzbuzz' } });
    const form = screen.getByTestId('update-form');
    fireEvent.submit(form);

    expect(Socket.emit).toHaveBeenCalledWith('update', {
      second: 'new-fizz',
      minute: 'new-buzz',
      hour: 'new-fizzbuzz'
    });

    expect(mockDialog.close).toHaveBeenCalledWith('closed');
  });

  test('Uses current messages as fallback when form fields are empty', () => {
    render(<UpdateDialog currentMessages={mockMessages} />);

    const secondInput = screen.getByLabelText('Seconds');
    const minuteInput = screen.getByLabelText('Minutes');
    const hourInput = screen.getByLabelText('Hours');

    fireEvent.change(secondInput, { target: { value: '' } });
    fireEvent.change(minuteInput, { target: { value: '' } });
    fireEvent.change(hourInput, { target: { value: '' } });
    const form = screen.getByTestId('update-form');
    fireEvent.submit(form);

    expect(Socket.emit).toHaveBeenCalledWith('update', {
      second: mockMessages.second,
      minute: mockMessages.minute,
      hour: mockMessages.hour
    });
  });
});
