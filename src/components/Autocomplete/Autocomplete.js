import React from 'react';
import { useAutocomplete } from './useAutocomplete';
import { useTouchEvents } from './useTouchEvents';
import { Input } from './Input';
import { Dropdown } from './Dropdown';
import './Autocomplete.css';

export function Autocomplete(props) {
  const [state, autocomplete] = useAutocomplete(props);

  const inputRef = React.useRef(null);
  const searchBoxRef = React.useRef(null);
  const dropdownRef = React.useRef(null);

  useTouchEvents({ ...autocomplete, inputRef, searchBoxRef, dropdownRef });

  return (
    <div
      className={[
        'algolia-autocomplete',
        state.status === 'stalled' && 'algolia-autocomplete--stalled',
        state.status === 'error' && 'algolia-autocomplete--errored',
      ]
        .filter(Boolean)
        .join(' ')}
      {...autocomplete.getRootProps()}
    >
      <Input
        {...autocomplete}
        {...state}
        inputRef={inputRef}
        searchBoxRef={searchBoxRef}
      />
      <Dropdown {...autocomplete} {...state} dropdownRef={dropdownRef} />
    </div>
  );
}
