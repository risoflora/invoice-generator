import { FunctionComponent } from 'react';

const version = import.meta.env.VITE_APP_VERSION;

const RateUs: FunctionComponent<JSX.IntrinsicElements['div']> = ({ className, ...props }) => (
  <div className={`p-1 mt-2 bg-light bg-opacity-75 text-dark rounded${className ? ` ${className}` : ''}`} {...props}>
    <a
      className="link-dark text-decoration-none"
      href="https://chrome.google.com/webstore/detail/invoice-generator/obdabdocagpfclncklefebhhgggkbbnk/reviews"
      target="_blank"
      rel="noreferrer"
    >
      <div className="text-center">
        <span className="me-2" style={{ verticalAlign: 'text-bottom' }}>
          Please rate us!
        </span>
        <span className="fs-1 lh-1 text-warning">⭑⭑⭑⭑⭑</span>
        <p className="fw-lighter fst-normal font-monospace text-muted p-0 m-0">v{version}</p>
      </div>
    </a>
  </div>
);

export default RateUs;
