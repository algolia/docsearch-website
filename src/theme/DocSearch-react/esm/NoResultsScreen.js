function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

import React from 'react';
import { NoResultsIcon } from './icons';
export function NoResultsScreen(props) {
  var searchSuggestions = props.state.context.searchSuggestions;
  return React.createElement("div", {
    className: "DocSearch-NoResults"
  }, React.createElement("div", {
    className: "DocSearch-Screen-Icon"
  }, React.createElement(NoResultsIcon, null)), React.createElement("p", {
    className: "DocSearch-Title"
  }, "No results for \"", React.createElement("strong", null, props.state.query), "\"."), searchSuggestions && searchSuggestions.length > 0 && React.createElement("p", null, "Try searching for", ' ', searchSuggestions.slice(0, 3).reduce(function (acc, search) {
    return [].concat(_toConsumableArray(acc), [React.createElement("button", {
      className: "DocSearch-Prefill",
      key: search,
      onClick: function onClick() {
        props.setQuery(search.toLowerCase() + ' ');
        props.refresh();
        props.inputRef.current.focus();
      }
    }, search)]);
  }, [])), React.createElement("p", {
    className: "DocSearch-Help"
  }, "If you believe this query should return results, please", ' ', React.createElement("a", {
    href: "https://github.com/algolia/docsearch-configs/issues/new?template=Missing_results.md",
    target: "_blank",
    rel: "noopener noreferrer"
  }, "let us know on GitHub"), "."));
}