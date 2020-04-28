import React from 'react';

export function useTouchEvents(props) {
  React.useEffect(() => {
    if (
      !(
        props.searchBoxRef.current &&
        props.dropdownRef.current &&
        props.inputRef.current
      )
    ) {
      return undefined;
    }

    const { onTouchStart, onTouchMove } = props.getEnvironmentProps({
      searchBoxElement: props.searchBoxRef.current,
      dropdownElement: props.dropdownRef.current,
      inputElement: props.inputRef.current,
    });

    window.addEventListener('touchstart', onTouchStart);
    window.addEventListener('touchmove', onTouchMove);

    return () => {
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
    };
  }, [props]);
}
