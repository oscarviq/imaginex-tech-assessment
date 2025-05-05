import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, afterEach, test, expect, vi } from 'vitest';

import ClockDisplay from '../components/ClockDisplay';
import { MessagesConfig } from '@shared/types';

describe('ClockDisplay Component', () => {
  const mockMessages: MessagesConfig = {
    second: 'fizz',
    minute: 'buzz',
    hour: 'fizzbuzz'
  };

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('Renders pending state when no message is provided', () => {
    render(<ClockDisplay message="" type="second" seconds={ undefined } currentMessages={ undefined } />);
    expect(screen.getByText('Pending...')).toBeInTheDocument();
  });

  test('Renders message with correct color based on type', () => {
    const { rerender } = render(<ClockDisplay message="test" type="second" seconds={ undefined } currentMessages={ undefined } />);
    const messageElement = screen.getByText('test');
    expect(messageElement).toHaveClass('text-green-500');

    rerender(<ClockDisplay message="test" type="minute" seconds={ undefined } currentMessages={ undefined } />);
    expect(messageElement).toHaveClass('text-yellow-500');

    rerender(<ClockDisplay message="test" type="hour" seconds={ undefined } currentMessages={ undefined } />);
    expect(messageElement).toHaveClass('text-red-500');
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

    const updateButton = screen.getByRole('button');
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

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  test('Opens modal when update button is clicked', async () => {
    const showModalMock = vi.fn();
    const mockDialog = { showModal: showModalMock };
    vi.spyOn(document, 'getElementById').mockReturnValue(mockDialog as unknown as HTMLDialogElement);

    render(
      <ClockDisplay
        message="test"
        type="second"
        seconds={ undefined }
        currentMessages={ mockMessages }
      />
    );

    const openModalButton = screen.getByRole('button');
    fireEvent.click(openModalButton);

    expect(showModalMock).toHaveBeenCalled();
  });
});
