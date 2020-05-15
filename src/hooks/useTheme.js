import { useState, useEffect } from 'react';

export function useTheme() {
  const [theme, setTheme] = useState(
    () =>
      (typeof window !== 'undefined' && window.localStorage.getItem('theme')) ||
      ''
  );

  useEffect(() => {
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const { matches } = window.matchMedia('(prefers-color-scheme: dark)');
    matches && setTheme('dark');
  }, []);

  return [theme, setTheme];
}
