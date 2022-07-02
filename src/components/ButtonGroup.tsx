import { FunctionComponent } from 'react';

const ButtonGroup: FunctionComponent<JSX.IntrinsicElements['div']> = ({ className, children, ...props }) => (
  <div
    className={`d-flex gap-2${className ? ` ${className}` : ''}`}
    style={{ maxWidth: '22rem', maxHeight: '2rem' }}
    {...props}
  >
    {children}
  </div>
);

export default ButtonGroup;
