import { FunctionComponent } from 'react';

import Icon from './Icon';

type Props = {
  icon?: string;
};

const Button: FunctionComponent<Props & JSX.IntrinsicElements['button']> = ({
  className,
  icon,
  children,
  ...props
}) => {
  const alt = typeof children === 'string' ? (children as string) : undefined;
  return (
    <button className={`btn btn-success fw-bold w-100${className ? ` ${className}` : ''}`} aria-label={alt} {...props}>
      <Icon className="me-2" name={icon} alt={alt} />
      {children}
    </button>
  );
};

export default Button;
