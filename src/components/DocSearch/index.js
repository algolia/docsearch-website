import React, { useRef, useEffect } from 'react';

export default function DocSearch({ indexName, apiKey }) {
  console.log(apiKey);

  const docsearchRef = useRef(null);
  useEffect(() => {
    if (!docsearchRef.current) {
      return;
    }

    import('docsearch.js').then(({ default: docsearch }) => {
      docsearch({
        apiKey,
        indexName,
        inputSelector: `#${docsearchRef.current.id}`,
        debug: false, // Set debug to true if you want to inspect the dropdown
      });
    });
  }, [docsearchRef, indexName, apiKey]);
  return <input id="q" ref={docsearchRef} />;
}
