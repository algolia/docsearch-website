import React from 'react';

import { createAutocomplete } from '@francoischalifour/autocomplete-core';

export function useAutocomplete(props) {
  const [state, setState] = React.useState(props.initialState || {});

  const autocomplete = React.useMemo(
    () =>
      createAutocomplete({
        ...props,
        onStateChange({ state }) {
          setState(state);

          if (typeof props.onStateChange === 'function') {
            props.onStateChange({ state });
          }
        },
      }),
    [props]
  );

  return [state, autocomplete];
}
