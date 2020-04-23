import React from 'react';
export function ErrorScreen() {
  return React.createElement("div", {
    className: "DocSearch-ErrorScreen"
  }, React.createElement("p", null, "We\u2018re unable to fetch results. You might want to check your network connection."));
}