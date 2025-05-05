import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';

import Error from '../components/Error';

describe('Error Component', () => {
  test('Renders the disconnected message', () => {
    render(<Error />);
    expect(screen.getByText('Error')).toBeInTheDocument();
  });

  test('Renders the icon', () => {
    render(<Error />);
    const svg = screen.getByTestId('icon');
    expect(svg).toBeInTheDocument();
  });
});
