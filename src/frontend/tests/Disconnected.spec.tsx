import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';

import Disconnected from '../components/Disconnected';

describe('Disconnected Component', () => {
  test('Renders the disconnected message', () => {
    render(<Disconnected />);
    expect(screen.getByText('Disconnected')).toBeInTheDocument();
  });

  test('Renders the icon', () => {
    render(<Disconnected />);
    const svg = screen.getByTestId('icon');
    expect(svg).toBeInTheDocument();
  });
});
