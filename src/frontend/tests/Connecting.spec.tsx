import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';

import Connecting from '../components/Connecting';

describe('Connecting Component', () => {
  test('Renders the connecting message', () => {
    render(<Connecting />);
    expect(screen.getByText('Connecting...')).toBeInTheDocument();
  });

  test('Renders the spinning icon', () => {
    render(<Connecting />);
    const svg = screen.getByTestId('spinning-icon');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass('animate-spin');
  });
});
