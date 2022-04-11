import { FunctionComponent } from 'react';

const Input: FunctionComponent<JSX.IntrinsicElements['input']> = ({ className, placeholder, ...props }) => (
  <input
    type="text"
    className={`form-control form-control-sm${className ? ` ${className}` : ''}`}
    placeholder={placeholder}
    aria-label={placeholder}
    {...props}
  />
);

export default Input;
