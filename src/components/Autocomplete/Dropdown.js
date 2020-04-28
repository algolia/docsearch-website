import React from 'react';
import { ReverseHighlight } from './Highlight';

export function Dropdown(props) {
  return (
    <div
      className="algolia-autocomplete-dropdown"
      ref={props.dropdownRef}
      hidden={!props.isOpen}
      {...props.getDropdownProps()}
    >
      {props.isOpen && (
        <div className="algolia-autocomplete-dropdown-container">
          {props.suggestions.map((suggestion, index) => {
            const { source, items } = suggestion;

            return (
              <section
                key={`result-${index}`}
                className="algolia-autocomplete-suggestions"
              >
                {items.length > 0 && (
                  <ul {...props.getMenuProps()}>
                    {items.map((item, index) => {
                      return (
                        <li
                          key={`item-${index}`}
                          className="algolia-autocomplete-suggestions-item"
                          {...props.getItemProps({
                            item,
                            source,
                          })}
                        >
                          <img className="algolia-autocomplete-suggestion-icon" src={item.documentation.favicon} width="18px"/>
                          <ReverseHighlight hit={item} attribute="docsearch.index" />
                        </li>
                      );
                    })}
                  </ul>
                )}
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
