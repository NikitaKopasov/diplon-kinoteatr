import { useEffect, useRef, useState } from 'react';

export const useImageSlider = (images, delay = 7000, fadeDuration = 1000) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [isFading, setIsFading] = useState(false);
  const fadeTimeout = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true);

      fadeTimeout.current = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
        setNextIndex((prev) => (prev + 2) % images.length);
        setIsFading(false);
      }, fadeDuration);
    }, delay);

    return () => {
      clearInterval(interval);
      clearTimeout(fadeTimeout.current);
    };
  }, [images.length, delay, fadeDuration]);

  return { currentIndex, nextIndex, isFading };
};
