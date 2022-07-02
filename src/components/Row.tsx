import { FunctionComponent, ReactNode } from 'react';

import Icon from './Icon';

type Props = {
  title: string;
  icon?: string;
  extra?: ReactNode;
};

const Row: FunctionComponent<Props & JSX.IntrinsicElements['div']> = ({
  className,
  title,
  icon,
  extra,
  children,
  ...props
}) => (
  <div className={`card mb-1${className ? ` ${className}` : ''}`} {...props}>
    <div className="d-inline-flex align-items-center card-header text-white bg-success bg-opacity-50 fw-bold py-1">
      <Icon className="me-2" name={icon} alt={title} />
      {title}
      {extra && <div className="d-inline-flex ms-auto">{extra}</div>}
    </div>
    <div className="card-body bg-success text-dark bg-opacity-10 p-2">
      <div className="row g-2">{children}</div>
    </div>
  </div>
);

export default Row;
