import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import { useLocation } from 'react-router';
import queryString from 'query-string';
import { Button, Hero, Text, Pill, LabelText } from '@algolia/ui-library';
import DocSearch from '../components/DocSearch';
import ErrorBoundary from '../components/ErrorBoundary';
import algoliasearch from 'algoliasearch/lite';
import Card from '@algolia/ui-library/public/components/Card';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import github from 'prism-react-renderer/themes/github';
import vsDark from 'prism-react-renderer/themes/vsDark';

function Landing() {
  const {
    appId: appIdQS = 'BH4D9OD16A',
    indexName: indexNameQS = '',
    apiKey: apiKeyQS = '',
  } = queryString.parse(useLocation().search);

  const [isValidDSCred, setisValidDSCred] = useState(false);
  const [wrongCredentials, setWrongCredentials] = useState(false);
  const [appId, setAppId] = useState(appIdQS);
  const [indexName, setIndexName] = useState(indexNameQS);
  const [apiKey, setApiKey] = useState(apiKeyQS);

  const currentTheme =
    typeof document !== 'undefined'
      ? document.querySelector('html').getAttribute('data-theme')
      : '';
  const [theme, setTheme] = useState(currentTheme);

  const fallbackToDocSearchDocCred = () => {
    setisValidDSCred(false);
    setAppId('BH4D9OD16A');
    setIndexName('docsearch');
    setApiKey('25626fae796133dc1e734c6bcaaeac3c');
  };

  useEffect(() => {
    // Credential not provided
    if (!indexName && !apiKey) {
      fallbackToDocSearchDocCred();
      return;
    }
    if ((!indexName && !apiKey) || apiKey.length !== 32) {
      setWrongCredentials(true);
      fallbackToDocSearchDocCred();
      return;
    }
    const searchClient = algoliasearch(appId, apiKey);
    const index = searchClient.initIndex(indexName);
    index
      .search('')
      .then(_ => setisValidDSCred(true))
      .catch(_ => {
        setWrongCredentials(true);
        fallbackToDocSearchDocCred();
      });
  }, [appId, indexName, apiKey]);

  return (
    <Layout
      title="DocSearch Landing"
      description="Try out the search for your DocSearch project"
      theme={theme}
      setTheme={setTheme}
    >
      <Hero background="orbInside" title="Integrate it!" padding="small" />
      <Card
        background={theme === 'dark' ? 'dark' : 'light'}
        className="m-auto mt-4"
        style={{ position: 'relative', maxWidth: '800px' }}
      >
        <Text>
          Try it out with the index: <Pill>{`${indexName}`}</Pill>
        </Text>
        <ErrorBoundary>
          {isValidDSCred && (
            <DocSearch appId={appId} indexName={indexName} apiKey={apiKey} />
          )}
          {wrongCredentials && (
            <Text color="mars-0">
              The credentials provided from the URL were wrong, we will demo the
              search with the search of our documentation instead.
            </Text>
          )}
        </ErrorBoundary>
      </Card>
      <Card
        className="m-auto mt-4"
        style={{ position: 'relative', maxWidth: '800px', marginTop: '2em' }}
        background={theme === 'dark' ? 'dark' : 'light'}
      >
        <LabelText big>Instructions:</LabelText>
        <br />
        <br />
        <Text>
          Congratulations, your search is now ready!
          <br />
          We ha've successfully configured the underlying crawler and it will
          now run every 24h.
          <br />
          <br />
          You're now a few steps away from having it working on your website:
          <br />
          Include these assets:
          <br />
          <LiveProvider
            code={`<!-- at the end of the HEAD -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.css" />

<!-- at the end of the BODY -->
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.js"></script>
<script type="text/javascript"> docsearch({
    apiKey: '${apiKey}',
    indexName: '${indexName}',
    inputSelector: '### REPLACE ME ####',
    debug: false // Set to true if you want to inspect the dropdown
});
</script>`}
            language="html"
            noInline={true}
            transformCode={code =>
              `class Null extends React.Component {render(){return null}}`
            }
            theme={github | vsDark}
          >
            <LiveEditor />
            <LiveError />
            <LivePreview />
          </LiveProvider>
        </Text>
        <LabelText big>Need an index?</LabelText>
        <br />
        <br />
        <div className="jc-center fxd-column d-flex">
          <Button
            primary
            style={{ textDecoration: 'none', alignItems: 'center' }}
            href={useBaseUrl('/apply')}
          >
            Join the Program
          </Button>
        </div>
      </Card>
    </Layout>
  );
}

export default Landing;
