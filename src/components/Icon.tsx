import { FunctionComponent } from 'react';

type Props = {
  name?: string;
  alt?: string;
};

const Icon: FunctionComponent<Props & JSX.IntrinsicElements['i']> = ({ name, alt, className, ...props }) =>
  name ? (
    <i className={`bi bi-${name}${className ? ` ${className}` : ''}`} role="img" aria-label={alt} {...props}></i>
  ) : null;

export default Icon;
