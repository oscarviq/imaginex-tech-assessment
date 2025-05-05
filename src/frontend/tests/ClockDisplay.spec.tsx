import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, beforeEach, afterEach, test, expect, vi } from 'vitest';

import ClockDisplay from '../components/ClockDisplay';
import { MessagesConfig } from '@shared/types';

describe('ClockDisplay Component', () => {
  let mockDialog: HTMLDialogElement;

  const mockMessages: MessagesConfig = {
    second: 'fizz',
    minute: 'buzz',
    hour: 'fizzbuzz'
  };

  beforeEach(() => {
    mockDialog = { showModal: vi.fn() } as unknown as HTMLDialogElement;
    vi.spyOn(document, 'getElementById').mockReturnValue(mockDialog);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('Renders pending state when no message is provided', () => {
    render(<ClockDisplay message="" type="second" seconds={ undefined } currentMessages={ mockMessages } />);
    expect(screen.getByText('Pending...')).toBeInTheDocument();
  });

  test('Renders message with correct color based on type', () => {
    const { rerender } = render(<ClockDisplay message={ mockMessages.second } type="second" seconds={ 1000 } currentMessages={ mockMessages } />);
    const messageElement = screen.getByTestId('message');
    expect(messageElement).toHaveClass('text-green-500');
    expect(messageElement).toHaveTextContent(mockMessages.second);

    rerender(<ClockDisplay message={ mockMessages.minute } type="minute" seconds={ 60 * 1000 } currentMessages={ mockMessages } />);
    expect(messageElement).toHaveClass('text-yellow-500');
    expect(messageElement).toHaveTextContent(mockMessages.minute);

    rerender(<ClockDisplay message={ mockMessages.hour } type="hour" seconds={ 60 * 60 * 1000 } currentMessages={ mockMessages } />);
    expect(messageElement).toHaveClass('text-red-500');
    expect(messageElement).toHaveTextContent(mockMessages.hour);
  });

  test('Displays elapsed time when seconds are provided', () => {
    render(
      <ClockDisplay
        message="test"
        type="second"
        seconds={ 3665 } // 1h 1m 5s
        currentMessages={ undefined }
      />
    );

    expect(screen.getByText('1h 1m 5s Elapsed')).toBeInTheDocument();
  });

  test('Shows update button and dialog when message is present', () => {
    render(
      <ClockDisplay
        message="test"
        type="second"
        seconds={ undefined }
        currentMessages={ mockMessages }
      />
    );

    const updateButton = screen.getByTestId('open-modal-button');
    const tooltipContainer = updateButton.parentElement;
    expect(updateButton).toBeInTheDocument();
    expect(tooltipContainer).toHaveClass('tooltip');
    expect(tooltipContainer).toHaveAttribute('data-tip', 'Update Messages');
  });

  test('Does not show update button when no message is present', () => {
    render(
      <ClockDisplay
        message=""
        type="second"
        seconds={ undefined }
        currentMessages={ mockMessages }
      />
    );

    expect(screen.queryByTestId('open-modal-button')).not.toBeInTheDocument();
  });

  test('Opens modal when update button is clicked', async () => {
    render(
      <ClockDisplay
        message="test"
        type="second"
        seconds={ undefined }
        currentMessages={ mockMessages }
      />
    );

    const openModalButton = screen.getByTestId('open-modal-button');
    fireEvent.click(openModalButton);
    expect(mockDialog.showModal).toHaveBeenCalled();
  });
});
