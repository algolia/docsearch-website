import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import { useLocation } from 'react-router';
import queryString from 'query-string';
import { Hero, Text, Pill} from '@algolia/ui-library';
import DocSearch from '../components/DocSearch';
import ErrorBoundary from '../components/ErrorBoundary';
import algoliasearch from 'algoliasearch';
import Card from '@algolia/ui-library/public/components/Card';

function Playground() {
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
      title="DocSearch Playground"
      description="Try out the search for your DocSearch project"
    >
      <Hero
        background="orbInside"
        title="Playground"
        padding="small"
      />
      <Card className="m-auto mt-4" style={{ position:'relative', maxWidth: '800px' }}>
          <Text>
            Try it out with the index:{' '}
            <Pill>{`${indexName}`}</Pill>
          </Text>
          <ErrorBoundary>
            {isValidDSCred && (
              <DocSearch appId={appId} indexName={indexName} apiKey={apiKey} />
            )}
            {wrongCredentials && (
              <Text color="mars-0">
                The credentials provided from the URL were wrong, we will demo
                the search with the search of our documentation instead.
              </Text>
            )}
          </ErrorBoundary>
      </Card>
    </Layout>
  );
}

export default Playground;
