import { FunctionComponent } from 'react';

type Props = {
  text?: string;
};

const Status: FunctionComponent<Props & JSX.IntrinsicElements['span']> = ({ className, text, ...props }) =>
  text ? (
    <span className={`badge bg-success bg-opacity-50${className ? ` ${className}` : ''}`} {...props}>
      {text}
    </span>
  ) : null;

export default Status;
