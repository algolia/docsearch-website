function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import React, { useState, useEffect } from 'react';
import { SearchIcon } from './icons/SearchIcon';
var ACTION_KEY_DEFAULT = 'Ctrl';
var ACTION_KEY_APPLE = '⌘';

function isAppleDevice() {
  if (typeof navigator === 'undefined') {
    return ACTION_KEY_DEFAULT;
  }

  return /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);
}

export function SearchButton(props) {
  var _useState = useState(function () {
    return isAppleDevice() ? ACTION_KEY_APPLE : ACTION_KEY_DEFAULT;
  }),
      _useState2 = _slicedToArray(_useState, 2),
      key = _useState2[0],
      setKey = _useState2[1];

  useEffect(function () {
    if (isAppleDevice()) {
      setKey(ACTION_KEY_APPLE);
    }
  }, []);
  return React.createElement("button", {
    type: "button",
    className: "DocSearch-SearchButton",
    onClick: props.onClick
  }, React.createElement(SearchIcon, null), React.createElement("span", {
    className: "DocSearch-SearchButton-Placeholder"
  }, "Search"), React.createElement("span", {
    className: "DocSearch-SearchButton-Key"
  }, key), React.createElement("span", {
    className: "DocSearch-SearchButton-Key"
  }, "K"));
}