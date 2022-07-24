import { useEffect, useRef } from 'react';

const useIsFirstRender = () => {
  const isMountRef = useRef(true);
  useEffect(() => {
    isMountRef.current = false;
  }, []);

  return isMountRef.current;
};

export default useIsFirstRender;
