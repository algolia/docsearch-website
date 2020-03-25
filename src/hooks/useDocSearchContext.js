import { createContext, useContext } from 'react';

export const DocSearchContext = createContext(null);

export function useDocSearchContext() {
  const context = useContext(DocSearchContext);

  if (context === undefined) {
    throw new Error(
      '`useDocSearchContext` must be used within a DocSearch provider.'
    );
  }

  return context;
}
