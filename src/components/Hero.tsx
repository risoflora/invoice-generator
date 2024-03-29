import { FunctionComponent } from 'react';

type Props = {
  text: string;
  logo?: string;
};

const Hero: FunctionComponent<Props & JSX.IntrinsicElements['h6']> = ({
  className,
  text,
  logo,
  children,
  ...props
}) => (
  <h6
    className={`bg-body text-success text-center bg-success bg-opacity-50 shadow rounded-pill p-1${
      className ? ` ${className}` : ''
    }`}
    {...props}
  >
    {logo && <img className="me-2" src={logo} alt={text || (typeof children === 'string' ? children : undefined)} />}
    <strong>{text}</strong>
    {children}
  </h6>
);

export default Hero;
