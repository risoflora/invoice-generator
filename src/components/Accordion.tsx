import { FunctionComponent } from 'react';

const Accordion: FunctionComponent<JSX.IntrinsicElements['div']> = ({ className, children, ...props }) => (
  <div data-testid="accordion-container" className={`accordion${className ? ` ${className}` : ''}`} {...props}>
    {children}
  </div>
);

export default Accordion;
