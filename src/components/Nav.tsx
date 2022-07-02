import { FunctionComponent } from 'react';

type Props = {
  logo?: string;
  title: string;
};

const Nav: FunctionComponent<Props & JSX.IntrinsicElements['div']> = ({
  className,
  logo,
  title,
  children,
  ...props
}) => (
  <nav className={`navbar sticky-top bg-light rounded py-1 mb-1${className ? ` ${className}` : ''}`} {...props}>
    <div className="container-fluid">
      <div className="navbar-brand py-0">
        {logo && <img className="d-inline-block align-text-top" src={logo} alt={title} />}
        <span className="text-success fw-semibold ms-2">{title}</span>
      </div>
      {children}
    </div>
  </nav>
);

export default Nav;
