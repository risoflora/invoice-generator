import { FunctionComponent } from 'react';

import Icon from './Icon';

type Props = {
  title: string;
  icon?: string;
};

const Section: FunctionComponent<Props & JSX.IntrinsicElements['div']> = ({
  className,
  title,
  icon,
  children,
  ...props
}) => (
  <div className={`card mb-2${className ? ` ${className}` : ''}`} {...props}>
    <div className="card-header text-white bg-success bg-opacity-50 fw-bold">
      <Icon className="me-2" name={icon} alt={title} />
      {title}
    </div>
    <div className="card-body bg-success text-dark bg-opacity-10 p-2">
      <div className="row g-2">{children}</div>
    </div>
  </div>
);

export default Section;
