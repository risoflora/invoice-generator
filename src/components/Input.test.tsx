import { render, screen } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  test('should render', () => {
    render(<Input placeholder="my label" />);
    const inputElement = screen.getByPlaceholderText('my label');
    expect(inputElement).toBeInTheDocument();
  });

  test.todo('should render with class');
});
