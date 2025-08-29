// hooks/useResizeFontOnOverflow.ts
import { useState, useLayoutEffect, useRef } from 'react';

export const useResizeFontOnOverflow = () => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [fontSize, setFontSize] = useState<string>('2rem');

  useLayoutEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const resizeObserver = new ResizeObserver(() => {
      const currentFontSize = parseFloat(getComputedStyle(element).fontSize);
      let newSize = currentFontSize;
      
      while ((element.scrollWidth > element.clientWidth || element.scrollHeight > element.clientHeight) && newSize > 1) {
        newSize -= 0.1;
        element.style.fontSize = `${newSize}px`;
      }
      
      setFontSize(`${newSize}px`);

      const hasOverflow = element.scrollWidth > element.clientWidth || element.scrollHeight > element.clientHeight;
      if (!hasOverflow && currentFontSize < parseFloat(getComputedStyle(element).fontSize)) {
          element.style.fontSize = `${parseFloat(fontSize)}px`;
          setFontSize(fontSize);
      }
    });

    resizeObserver.observe(element);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return { elementRef, fontSize };
};