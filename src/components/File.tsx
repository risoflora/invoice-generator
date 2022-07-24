import { FunctionComponent, useRef } from 'react';

import Button from './Button';

type Props = {
  icon?: string;
  fullWidth?: boolean;
  accept?: string;
  onFileChange?: (content?: string) => void;
};

const File: FunctionComponent<Props & JSX.IntrinsicElements['input']> = ({
  icon,
  fullWidth,
  accept,
  children,
  onFileChange,
  ...props
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        style={{ display: 'none' }}
        onChange={(event) => {
          const reader = new FileReader();
          reader.onload = () => {
            if (onFileChange) {
              onFileChange(reader.result as string);
            }
          };
          if (event.target.files && event.target.files.length > 0) {
            reader.readAsText(event.target.files[0]);
          }
        }}
        {...props}
      />
      <Button icon={icon} fullWidth={fullWidth} onClick={() => fileInputRef.current?.click()}>
        {children}
      </Button>
    </>
  );
};

export default File;
