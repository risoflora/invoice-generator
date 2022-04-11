import { FunctionComponent } from 'react';

import Icon from './Icon';

type Props = {
  icon?: string;
};

const Link: FunctionComponent<Props & JSX.IntrinsicElements['a']> = ({ className, icon, children, ...props }) => {
  const alt = typeof children === 'string' ? (children as string) : undefined;
  return (
    <a
      className={`btn btn-success fw-bold w-100${className ? ` ${className}` : ''}`}
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
