import { FunctionComponent } from 'react';

const TextArea: FunctionComponent<JSX.IntrinsicElements['textarea']> = ({ className, placeholder, ...props }) => (
  <textarea
    className={`form-control form-control-sm${className ? ` ${className}` : ''}`}
    placeholder={placeholder}
    aria-label={placeholder}
    {...props}
  ></textarea>
);

export default TextArea;
