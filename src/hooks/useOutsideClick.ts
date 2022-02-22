import React, { useEffect } from 'react';

export const useOutsideClick = (ref: React.MutableRefObject<any>, callback: () => void): void => {
  useEffect(() => {
    const fn = (event: Event): void => {
      if (ref.current && !ref.current.contains(event.target) && typeof callback === 'function') {
        callback();
      }
    };

    document.addEventListener('mousedown', fn, false);

    return (): void => {
      document.removeEventListener('mousedown', fn, false);
    };
  }, [ref, callback]);
};

export default useOutsideClick;
