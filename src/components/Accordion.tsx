import { FunctionComponent } from 'react';

const Accordion: FunctionComponent<JSX.IntrinsicElements['div']> = ({ className, children, ...props }) => (
  <div className={`accordion${className ? ` ${className}` : ''}`} {...props}>
    {children}
  </div>
);

export default Accordion;
