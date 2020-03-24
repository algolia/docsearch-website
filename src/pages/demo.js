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
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import github from 'prism-react-renderer/themes/github';
import vsDark from 'prism-react-renderer/themes/vsDark';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

function Demo() {
  const { indexName: indexNameQS = '' } = queryString.parse(
    useLocation().search
  );

  const [isValidDSCred, setisValidDSCred] = useState(false);
  const [wrongCredentials, setWrongCredentials] = useState(false);
  let [indexName, setIndexName] = useState(indexNameQS);

  const currentTheme =
    typeof document !== 'undefined'
      ? document.querySelector('html').getAttribute('data-theme')
      : '';
  const [theme, setTheme] = useState(currentTheme);
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  const { themeConfig = {} } = siteConfig;
  const { navbar = {} } = themeConfig;
  const { logo = {} } = navbar;
  const logoUrl = useBaseUrl(
    theme === 'dark' ? logo.src_theme.dark : logo.src_theme.light
  );

  const fallbackToDocSearchDocCred = () => {
    setisValidDSCred(false);
    setIndexName('docsearch');
  };
  indexName = 'docsearch';

  useEffect(() => {
    // Credential not provided
    if (!indexName) {
      fallbackToDocSearchDocCred();
      return;
    }
    if (!indexName) {
      setWrongCredentials(true);
      fallbackToDocSearchDocCred();
      return;
    }
    const searchClient = algoliasearch(
      'DSW01O6QPF',
      'e55d03a808bad4e426d28fd4a1a18338'
    );
    const index = searchClient.initIndex('live-demo');
    index
      .search(indexName)
      .then(hits => console.log(hits))
      .catch(_ => {
        setWrongCredentials(true);
        fallbackToDocSearchDocCred();
      });
  }, [indexName]);
  const apiKey = 32321;
  return (
    <Layout
      title="DocSearch Demo"
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
        <LabelText style={{ margin: '2rem' }} big>
          <img style={{ height: '2rem' }} src={logoUrl} alt="DocSearch" />
          {'   '}
          <img
            className="ds-icon-heart"
            src={useBaseUrl('/img/icons/icon-heart.png')}
            width="30px"
          />{' '}
          zapier
        </LabelText>
        <Text>
          This page demonstrates a search as your type experience implemented by
          DocSearch on Zapier's documentation.{' '}
        </Text>
        <ul>
          <li>
            <img
              className="ds-icon"
              src={useBaseUrl('/img/icons/zap.png')}
              width="30px"
            />
            Smart and Instant
          </li>
          <li>
            <img
              className="ds-icon"
              src={useBaseUrl('/img/icons/typo.png')}
              width="30px"
            />
            Typo-tolerance
          </li>
          <li>
            <img
              className="ds-icon"
              src={useBaseUrl('/img/icons/highlight.png')}
              width="30px"
            />
            Highlighting
          </li>
        </ul>
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
        </Text>

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

export default Demo;
