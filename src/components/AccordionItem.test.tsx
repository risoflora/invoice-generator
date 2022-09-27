import { describe, expect, test } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

import AccordionItem from './AccordionItem';
import Accordion from './Accordion';

describe('AccordionItem', () => {
  test('should render', () => {
    render(
      <AccordionItem title="default rendering" ownerSelector="#ownerSelector">
        testing
      </AccordionItem>
    );
    const testingChildren = screen.getByText(/testing/);
    expect(testingChildren).toBeInTheDocument();
  });

  test('should render with class', () => {
    render(<AccordionItem title="rendering with class" ownerSelector="#ownerSelector" />);
    expect(screen.getByTestId('accordion-item')).toHaveClass('accordion-item');
    expect(screen.getByRole('button')).toHaveClass('collapsed');
  });

  test('should render expanded', () => {
    render(<AccordionItem title="rendering expanded" ownerSelector="#ownerSelector" expanded={true} />);
    expect(screen.getByRole('button')).toHaveClass('accordion-button');
    expect(screen.getByRole('button')).not.toHaveClass('collapsed');
  });

  test('should collapse when click on button', () => {
    render(
      <Accordion title="collapse when click" id="ownerSelector">
        <AccordionItem title="Testing" ownerSelector="#ownerSelector" />
      </Accordion>
    );
    const buttonElement = screen.getByRole('button', { expanded: false });

    fireEvent.click(buttonElement);
    expect(buttonElement).toHaveAttribute('aria-expanded', 'true');
    expect(buttonElement).not.toHaveClass('collapsed');
  });

  test('should be expanded when double click on button', () => {
    render(
      <Accordion title="Container Testing" id="ownerSelector">
        <AccordionItem title="Testing" ownerSelector="#ownerSelector" />
      </Accordion>
    );
    const buttonElement = screen.getByRole('button', { expanded: false });

    fireEvent.dblClick(buttonElement);
    expect(buttonElement).toHaveAttribute('aria-expanded', 'false');
    expect(buttonElement).toHaveClass('collapsed');
  });
});
