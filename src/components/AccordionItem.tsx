import { FunctionComponent, useRef, useState } from 'react';

import { uuid } from '../core/utils';

import './AccordionItem.scss';

type Props = {
  ownerSelector: string;
  title: string;
  titleClassName?: string;
  bodyClassName?: string;
  expanded?: boolean;
};

const AccordionItem: FunctionComponent<Props & JSX.IntrinsicElements['div']> = ({
  className,
  title,
  titleClassName,
  bodyClassName,
  expanded,
  ownerSelector,
  children,
  ...props
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const id = uuid();
  const headingTag = `heading-${id}`;
  const collapseTag = `collapse-${id}`;
  const owner = window.document.querySelector(ownerSelector);
  const [isExpanded, setIsExpanded] = useState(expanded);

  const isShown = () => Boolean(elementRef?.current?.classList.contains('show'));

  if (owner) {
    owner.addEventListener('shown.bs.collapse', () => setIsExpanded(isShown()));
    owner.addEventListener('hidden.bs.collapse', () => setIsExpanded(isShown()));
  }

  return (
    <div className={`accordion-item${className ? ` ${className}` : ''}`} {...props}>
      <h2 className="accordion-header" id={headingTag}>
        <button
          className={`accordion-button${isExpanded ? '' : ' collapsed'}${titleClassName ? ` ${titleClassName}` : ''}`}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#${collapseTag}`}
          aria-expanded={isExpanded ? 'true' : 'false'}
          aria-controls={collapseTag}
        >
          {title && <strong className="text-black-50">{title}</strong>}
        </button>
      </h2>
      <div
        ref={elementRef}
        id={collapseTag}
        className={`accordion-collapse collapse${isExpanded ? ' show' : ''}`}
        aria-labelledby={headingTag}
        data-bs-parent={ownerSelector}
      >
        <div className={`accordion-body px-1 py-2${bodyClassName ? ` ${bodyClassName}` : ''}`}>{children}</div>
      </div>
    </div>
  );
};

export default AccordionItem;
