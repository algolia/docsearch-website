import React, { useRef, useEffect } from 'react';

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
      <input
        id="q"
        ref={docsearchRef}
      />
    </>
  );
}
