import React, { useRef, useEffect } from 'react';
import './DocSearch.css';

export default function DocSearch({ appId, indexName, apiKey }) {
  const docsearchRef = useRef(null);
  useEffect(() => {
    if (!docsearchRef.current) {
      return;
    }
    import('docsearch.js').then(({ default: docsearch }) => {
      docsearch({
        appId,
        apiKey,
        indexName,
        inputSelector: `#${docsearchRef.current.id}`,
        debug: true, // Set debug to true if you want to inspect the dropdown
      });
    });
  }, [docsearchRef, indexName, apiKey]);

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.css"
      />
      <div
        style={{
          marginLeft: '10%',
          marginRight: '10%',
          width: '80%',
        }}
      >
        <input
          id="q"
          style={{
            height: '3em',
            width: '100%',
          }}
          ref={docsearchRef}
        />
      </div>
    </>
  );
}
