import React, { useState, useEffect, useRef } from 'react';
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
import {
  InstantSearch,
  SearchBox,
  Configure,
  connectStateResults,
  connectHits,
} from 'react-instantsearch-dom';
const Results = connectStateResults(
  ({ searchState, searchResults, children }) =>
    searchResults && searchResults.hits.filter(e => e.name).length !== 0 ? (
      children
    ) : (
      <div>No results have been found for {searchState.query}.</div>
    )
);
const Hits = ({ hits }) => (
  <ol>
    {hits
      .filter(e => e.name)
      .map(hit => (
        <li key={hit.objectID}>
          <InlineLink
            style={{ textDecoration: 'none', alignItems: 'center' }}
            href={useBaseUrl(`/demo?indexName=${hit.docsearch.index}`)}
          >
            {hit.name}
          </InlineLink>
          - {hit.documentation.url}
        </li>
      ))}
  </ol>
);

const CustomHits = connectHits(Hits);
function Demo() {
  const { indexName: indexNameQS = '' } = queryString.parse(
    useLocation().search
  );

  const [isValidDSCred, setisValidDSCred] = useState(false);
  const [wrongCredentials, setWrongCredentials] = useState(false);
  const [selection, setSelection] = useState(false);
  let [indexName, setIndexName] = useState(indexNameQS);
  let [apiKey, setApiKey] = useState(null);
  let [projectName, setProjectName] = useState(null);

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
  const indexNameRef = useRef(indexName);
  const searchClient = algoliasearch(
    'DSW01O6QPF',
    'e55d03a808bad4e426d28fd4a1a18338'
  );
  useEffect(() => {
    console.log(indexNameRef);
    if (!indexName && !indexNameRef.current) {
      fallbackToDocSearchDocCred();
      return;
    }

    console.log('Search?');
    console.log(!selection && !projectName);

    if (!selection && !projectName) {
      const index = searchClient.initIndex('live-demo');
      index
        .search(indexNameRef.current)
        .then(result => {
          if (!(result.nbHits > 0)) {
            setWrongCredentials(true);
          } else {
            const selected = result.hits[0];
            console.error(selected);
            setProjectName(selected.name);
            setIndexName(selected.docsearch.index);
            setApiKey(selected.docsearch.apiKey);
            setisValidDSCred(true);
            setSelection(true);
          }
        })
        .catch(_ => {
          setWrongCredentials(true);
          fallbackToDocSearchDocCred();
        });
    }
  }, [indexName]);

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
            <DocSearch
              appId="BH4D9OD16A"
              indexName={indexName}
              apiKey={apiKey}
            />
          )}
          {wrongCredentials && (
            <Text color="mars-0">
              The project provided from the URL were wrong, we will demo the
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
          {projectName}
        </LabelText>
        <Text style={{ marginTop: '1.5rem' }}>
          This page demonstrates a search as your type experience implemented by
          DocSearch on {projectName}'s documentation.{' '}
        </Text>
        <ul style={{ marginBottom: '2rem' }}>
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

        <Text style={{ marginTop: '1.5rem' }}>
          We ha've successfully configured the underlying crawler and it will
          now run every 24h.
          <br />
          You're now a few steps away from having it working on your website:
          <br />
          <br />
          Include a search input:
        </Text>

        <LiveProvider
          code={`<input type="text" id="q" placeholder="Search the doc" />`}
          language="html"
          noInline={true}
          transformCode={code =>
            `class Null extends React.Component {render(){return null}}`
          }
          theme={theme === 'dark' ? vsDark : github}
        >
          <LiveEditor />
          <LiveError />
          <LivePreview />
        </LiveProvider>
        <Text>
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
    inputSelector: '#q', // CSS selector to target <input/>
    debug: false // Set to true if you want to inspect the dropdown
});
</script>`}
          language="html"
          noInline={true}
          transformCode={code =>
            `class Null extends React.Component {render(){returyarn null}}`
          }
          theme={theme === 'dark' ? vsDark : github}
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
          <LabelText big style={{ marginTop: '1rem' }}>
            Need an index?
          </LabelText>
          <div
            style={{ marginTop: '2rem', marginBottom: '2rem' }}
            className="jc-center fxd-column d-flex"
          >
            <Button
              primary
              style={{ textDecoration: 'none', alignItems: 'center' }}
              href={useBaseUrl('/apply')}
            >
              Join the Program
            </Button>
          </div>
          <LabelText>Want to help another project?</LabelText>
        </Text>

        <InstantSearch indexName="live-demo" searchClient={searchClient}>
          <Configure filters="status.stage: Outbound" hitsPerPage={4} />

          <SearchBox showLoadingIndicator />
          <br />
          <Results>
            <CustomHits />
          </Results>
        </InstantSearch>
      </Card>
    </Layout>
  );
}

export default Demo;
