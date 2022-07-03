import { FunctionComponent } from 'react';

type Props = {
  title?: string;
};

const ListItem: FunctionComponent<Props & JSX.IntrinsicElements['li']> = ({ className, title, children, ...props }) => (
  <li className={`list-group-item list-group-item-light${className ? ` ${className}` : ''}`} {...props}>
    {title && (
      <div className="lh-sm text-truncate mx-1 me-auto" title={title}>
        {title}
      </div>
    )}
    {children}
  </li>
);

export default ListItem;
