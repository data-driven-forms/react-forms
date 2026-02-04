import { useRef, useEffect, RefObject } from 'react';

const useIsMounted = (): RefObject<boolean> => {
  const isMounted = useRef<boolean>(false);
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);
  return isMounted;
};

export default useIsMounted;
