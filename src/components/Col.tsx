import { FunctionComponent } from 'react';

type Props = {
  size?: number | string;
};

const Col: FunctionComponent<Props & JSX.IntrinsicElements['div']> = ({ className, size, children, ...props }) => (
  <div className={`col${size ? `-${size}` : ''}${className ? ` ${className}` : ''}`} {...props}>
    {children}
  </div>
);

export default Col;
