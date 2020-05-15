/* eslint-disable import/no-unresolved */

import React, { useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useHistory } from '@docusaurus/router';
import Link from '@docusaurus/Link';
import Head from '@docusaurus/Head';
import { DocSearchButton, useDocSearchKeyboardEvents } from '@docsearch/react';

let DocSearchModal = null;

function SearchBar() {
  const { siteConfig = {} } = useDocusaurusContext();
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);

  const {
    indexName,
    appId = 'BH4D9OD16A',
    apiKey,
    searchParameters,
  } = siteConfig.themeConfig.algolia;

  const importDocSearchModalIfNeeded = useCallback(
    function importDocSearchModalIfNeeded() {
      if (DocSearchModal) {
        return Promise.resolve();
      }

      return Promise.all([
        import('@docsearch/react/modal'),
        import('@docsearch/react/style'),
      ]).then(([{ DocSearchModal: Modal }]) => {
        DocSearchModal = Modal;
      });
    },
    []
  );

  const onOpen = useCallback(
    function onOpen() {
      importDocSearchModalIfNeeded().then(() => {
        setIsOpen(true);
      });
    },
    [importDocSearchModalIfNeeded, setIsOpen]
  );

  const onClose = useCallback(
    function onClose() {
      setIsOpen(false);
    },
    [setIsOpen]
  );

  useDocSearchKeyboardEvents({ isOpen, onOpen, onClose });

  return (
    <>
      <Head>
        <link
          rel="preconnect"
          href={`https://${appId}-dsn.algolia.net`}
          crossOrigin
        />
      </Head>

      <DocSearchButton
        onTouchStart={importDocSearchModalIfNeeded}
        onMouseOver={importDocSearchModalIfNeeded}
        onClick={onOpen}
      />

      {isOpen &&
        createPortal(
          <DocSearchModal
            appId={appId}
            apiKey={apiKey}
            indexName={indexName}
            searchParameters={searchParameters}
            onClose={onClose}
            navigator={{
              navigate({ suggestionUrl }) {
                history.push(suggestionUrl);
              },
            }}
            transformItems={items => {
              return items.map(item => {
                const url = new URL(item.url);

                return {
                  ...item,
                  url: item.url
                    .replace(url.origin, '')
                    .replace('#__docusaurus', ''),
                };
              });
            }}
            hitComponent={Hit}
          />,
          document.body
        )}
    </>
  );
}

function Hit({ hit, children }) {
  return <Link to={hit.url}>{children}</Link>;
}

export default SearchBar;
