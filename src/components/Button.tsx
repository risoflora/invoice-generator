import { FunctionComponent } from 'react';

import Icon from './Icon';

type Props = {
  icon?: string;
  fullWidth?: boolean;
};

const Button: FunctionComponent<Props & JSX.IntrinsicElements['button']> = ({
  className,
  icon,
  fullWidth,
  children,
  ...props
}) => {
  const alt = typeof children === 'string' ? (children as string) : undefined;
  return (
    <button
      type="button"
      className={`btn btn-sm btn-success fw-bold${fullWidth ? ' w-100' : ''}${className ? ` ${className}` : ''}`}
      aria-label={alt}
      {...props}
    >
      <Icon className={children ? 'me-2' : undefined} name={icon} alt={alt} />
      {children}
    </button>
  );
};

export default Button;
