import React from 'react';
import {
  parseHighlightedAttribute,
  parseReverseHighlightedAttribute,
  parseSnippetedAttribute,
} from '@francoischalifour/autocomplete-preset-algolia';

function Highlighter({ tagName, parts, ...rest }) {
  return (
    <span {...rest}>
      {parts.map((part, index) => {
        if (part.isHighlighted) {
          return React.createElement(tagName, { key: index }, part.value);
        }

        return part.value;
      })}
    </span>
  );
}

export function Highlight({ hit, attribute, tagName = 'mark', ...rest }) {
  let parts = [];

  try {
    parts = parseHighlightedAttribute({
      hit,
      attribute,
      highlightPreTag: `<${tagName}>`,
      highlightPostTag: `</${tagName}>`,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(error.message);
  }

  return <Highlighter tagName={tagName} parts={parts} {...rest} />;
}

export function Snippet({ hit, attribute, tagName = 'mark', ...rest }) {
  let parts = [];

  try {
    parts = parseSnippetedAttribute({
      hit,
      attribute,
      highlightPreTag: `<${tagName}>`,
      highlightPostTag: `</${tagName}>`,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(error.message);
  }

  return <Highlighter tagName={tagName} parts={parts} {...rest} />;
}

export function ReverseHighlight({
  hit,
  attribute,
  tagName = 'mark',
  ...rest
}) {
  let parts = [];

  try {
    parts = parseReverseHighlightedAttribute({
      hit,
      attribute,
      highlightPreTag: `<${tagName}>`,
      highlightPostTag: `</${tagName}>`,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(error.message);
  }

  return <Highlighter tagName={tagName} parts={parts} {...rest} />;
}
