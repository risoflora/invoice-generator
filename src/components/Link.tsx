import { FunctionComponent } from 'react';

import Icon from './Icon';

type Props = {
  icon?: string;
  fullWidth?: boolean;
};

const Link: FunctionComponent<Props & JSX.IntrinsicElements['a']> = ({
  className,
  icon,
  fullWidth,
  children,
  ...props
}) => {
  const alt = typeof children === 'string' ? (children as string) : undefined;

  return (
    <a
      className={`d-flex align-items-center justify-content-center btn btn-success fw-bold${fullWidth ? ' w-100' : ''}${
        className ? ` ${className}` : ''
      }`}
      role="button"
      aria-label={alt}
      {...props}
    >
      <Icon className="me-2" name={icon} alt={alt} />
      {children}
    </a>
  );
};

export default Link;
