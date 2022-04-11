import { FunctionComponent } from 'react';

const Container: FunctionComponent<JSX.IntrinsicElements['div']> = ({ className, children, ...props }) => (
  <div className={`container p-2${className ? ` ${className}` : ''}`} {...props}>
    {children}
  </div>
);

export default Container;
