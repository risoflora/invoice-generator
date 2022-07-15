import { FunctionComponent } from 'react';

const List: FunctionComponent<JSX.IntrinsicElements['ul']> = ({ className, children, ...props }) => (
  <ul className={`list-group list-group-flush${className ? ` ${className}` : ''}`} {...props}>
    {children}
  </ul>
);

export default List;
