import { FunctionComponent } from 'react';

type Props = {
  text?: string;
  isInput?: boolean;
};

const Status: FunctionComponent<Props & JSX.IntrinsicElements['span']> = ({
  className,
  text,
  isInput,
  children,
  ...props
}) =>
  isInput ? (
    children || text ? (
      <span {...props}>
        <input
          type="text"
          className={`form-control form-control-sm bg-transparent pe-none user-select-none border-0${
            className ? ` ${className}` : ''
          }`}
          value={children ? children.toString() : text}
        />
      </span>
    ) : null
  ) : children || text ? (
    <span className={`badge bg-success bg-opacity-50${className ? ` ${className}` : ''}`} {...props}>
      {children || text}
    </span>
  ) : null;

export default Status;
