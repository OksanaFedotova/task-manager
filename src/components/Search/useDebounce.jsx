import { useState, useEffect } from 'react';

// Наш хук
export default function useDebounce(value, delay) {
  // Состояние и сеттер для отложенного значения
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    //выставляем debouncedValue спустя указанное время
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    //отменяем предыдущий таймаут перед вызовом нового
    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  return debouncedValue;
}
