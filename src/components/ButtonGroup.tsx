import { FunctionComponent } from 'react';

const ButtonGroup: FunctionComponent<JSX.IntrinsicElements['div']> = ({ className, children, ...props }) => (
  <div className={`d-grid gap-2${className ? ` ${className}` : ''}`} {...props}>
    {children}
  </div>
);

export default ButtonGroup;
