import { FunctionComponent, useRef } from 'react';

import Button from './Button';

type Props = {
  icon?: string;
  onFileChange?: (content: string | undefined) => void;
};

const File: FunctionComponent<Props & JSX.IntrinsicElements['input']> = ({
  icon,
  children,
  onFileChange,
  ...props
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={(event) => {
          const reader = new FileReader();
          reader.onload = () => onFileChange && onFileChange(reader.result as string);
          if (event.target.files && event.target.files.length > 0) {
            reader.readAsText(event.target.files[0]);
          }
        }}
        {...props}
      />
      <Button icon={icon} onClick={() => fileInputRef.current?.click()}>
        {children}
      </Button>
    </>
  );
};

export default File;
