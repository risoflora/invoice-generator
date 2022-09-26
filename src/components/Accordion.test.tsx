import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';

import Accordion from './Accordion';

describe('Accordion', () => {
  beforeEach(() => {
    render(<Accordion title="Testing">testing</Accordion>);
  });
  afterEach(() => {
    cleanup();
  });

  test('should render', () => {
    const testingChildren = screen.getByText(/testing/);
    expect(testingChildren).toBeInTheDocument();
  });

  test('should render with class', () => {
    expect(screen.getByTestId('accordion-container')).toHaveClass('accordion');
  });
});
