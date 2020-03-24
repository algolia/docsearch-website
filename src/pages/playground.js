import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import { useLocation } from 'react-router';
import queryString from 'query-string';
import {
  Button,
  Hero,
  Text,
  Pill,
  LabelText,
  InlineLink,
} from '@algolia/ui-library';
import DocSearch from '../components/DocSearch';
import ErrorBoundary from '../components/ErrorBoundary';
import algoliasearch from 'algoliasearch/lite';
import Card from '@algolia/ui-library/public/components/Card';
import useBaseUrl from '@docusaurus/useBaseUrl';

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

  const currentTheme =
    typeof document !== 'undefined'
      ? document.querySelector('html').getAttribute('data-theme')
      : '';
  const [theme, setTheme] = useState(currentTheme);

  return (
    <Layout
      title="DocSearch Playground"
      description="Try out the search for your DocSearch project"
      theme={theme}
      setTheme={setTheme}
    >
      <Hero background="orbInside" title="Playground" padding="small" />
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
        background={theme === 'dark' ? 'dark' : 'light'}
        className="m-auto mt-4"
        style={{ position: 'relative', maxWidth: '800px', marginTop: '2em' }}
      >
        <LabelText big>Instructions:</LabelText>
        <br />
        <br />
        <Text>
          You can try it out with your own <Pill>apiKey</Pill> and{' '}
          <Pill>indexName</Pill> by fetching the following URL:
          <br />
          <br />
          <a
            href={useBaseUrl(
              '/playground/?indexName=<indexName>&apiKey=<apiKey>'
            )}
          >{`https://docsearch.algolia.com/playground/?indexName=<indexName>&apiKey=<apiKey>&appId=<appId>`}</a>
          <br />
          <br />
          <Pill>appId</Pill> is optionnal.
        </Text>
        <Text>
          Need to change something?
          <InlineLink
            style={{
              textDecoration: 'none',
              alignItems: 'center',
              paddingLeft: '1em',
            }}
            href={`https://github.com/algolia/docsearch-configs/blob/master/configs/${indexName}.json`}
          >
            Please submit a PR on your configuration
          </InlineLink>
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

export default Playground;
