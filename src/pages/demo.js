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

import { useDocSearchContext } from '../hooks/useDocSearchContext';
import { DocSearchLogo } from '../components/DocSearchLogo';

function Demo() {
  const { siteConfig } = useDocusaurusContext();
  const { theme, logoUrl } = useDocSearchContext();

  const DEFAULT_INDEX_NAME = siteConfig.themeConfig.algolia.indexName;
  const DEFAULT_API_KEY = siteConfig.themeConfig.algolia.apiKey;

  const {
    indexName: indexNameFromUrl = DEFAULT_INDEX_NAME,
  } = queryString.parse(useLocation().search);
  const [indexName, setIndexName] = useState(indexNameFromUrl);
  const [apiKey, setApiKey] = useState(null);
  const [projectName, setProjectName] = useState(null);
  const [docsearchIssueUrl, setDocsearchIssueUrl] = useState(null);
  const [selection, setSelection] = useState(false);

  const searchClient = useRef(
    algoliasearch('DSW01O6QPF', 'e55d03a808bad4e426d28fd4a1a18338')
  );

  function resetCredentials() {
    setIndexName(DEFAULT_INDEX_NAME);
    setApiKey(DEFAULT_API_KEY);
  }

  useEffect(() => {
    const index = searchClient.current.initIndex('live-demo');
    if (!selection && !projectName) {
      index
        .search(indexName, {
          filters: 'status.stage: "Outbound"',
          hitsPerPage: 1,
        })
        .then(result => {
          if (result.nbHits === 0) {
            resetCredentials();
          } else {
            const activeDocSearchIndex = result.hits[0];

            setProjectName(activeDocSearchIndex.name);
            setIndexName(activeDocSearchIndex.docsearch.index);
            setApiKey(activeDocSearchIndex.docsearch.apiKey);
            setDocsearchIssueUrl(
              activeDocSearchIndex.outbound.docsearchIssueUrl
            );
            console.log(activeDocSearchIndex.outbound);
          }
        })
        .catch(() => {
          resetCredentials();
        });
      setSelection(true);
    }
  }, [indexName]);

  const code = `<!-- at the end of the \`head\` -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.css" />

<!-- at the end of the \`body\` -->
<script src="https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.js"></script>
<script>
  docsearch({
    apiKey: '${apiKey}',
    indexName: '${indexName}',
    inputSelector: '#search', // CSS selector to target the <input />
    debug: false, // Set to \`true\` if you want to inspect the dropdown
  });
</script>`;
  return (
    <>
      <Hero background="orbInside" title="Integrate it!" padding="small" />
      <Card
        background={theme === 'dark' ? 'dark' : 'light'}
        className="m-auto mt-4"
        style={{ position: 'relative', maxWidth: '800px' }}
      >
        <Text>
          Try it out with the index: <Pill>{indexName}</Pill>
        </Text>

        <ErrorBoundary>
          {apiKey && (
            <DocSearch
              appId="BH4D9OD16A"
              indexName={indexName}
              apiKey={apiKey}
            />
          )}
        </ErrorBoundary>
      </Card>

      <Card
        className="m-auto"
        style={{
          position: 'relative',
          maxWidth: '800px',
          marginTop: '2rem',
          marginBottom: '2rem',
        }}
        background={theme === 'dark' ? 'dark' : 'light'}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <DocSearchLogo width="190px" />
          <img
            className="ds-icon-heart"
            src={useBaseUrl('/img/icons/icon-heart.png')}
            width="30px"
          />
          {projectName !== null && <LabelText big>{projectName}</LabelText>}
        </div>

        <Text style={{ marginTop: '1.5rem' }}>
          This page demonstrates a search-as-you-type experience implemented by
          DocSearch on {projectName}'s documentation.
        </Text>

        <LabelText big>Instructions</LabelText>

        <Text className="mt-4">
          We have configured the crawler. It will run every 24 hours. You're now
          a few steps away from having it work on your website.
        </Text>
        {docsearchIssueUrl && (
          <InlineLink
            style={{
              textDecoration: 'none',
            }}
            href={docsearchIssueUrl}
          >
            Thumb up the request to feature DocSearch on the repo 👍{' '}
            <img
              className="github__logo"
              src={useBaseUrl('/img/icons/icon-github.png')}
              width="30px"
              alt="GitHub"
            />
          </InlineLink>
        )}

        <Text className="mt-4">Include a search input:</Text>

        <LiveProvider
          code={`<input type="text" id="search" placeholder="Search the doc" />`}
          language="html"
          noInline={true}
          transformCode={_code =>
            `class Null extends React.Component {render(){return null}}`
          }
          theme={theme === 'dark' ? vsDark : github}
        >
          <LiveEditor />
          <LiveError />
          <LivePreview />
        </LiveProvider>

        <Text className="mt-4">Include these assets:</Text>

        <LiveProvider
          code={code}
          language="html"
          noInline={true}
          transformCode={_code =>
            `class Null extends React.Component {render(){return null}}`
          }
          theme={theme === 'dark' ? vsDark : github}
        >
          <LiveEditor />
          <LiveError />
          <LivePreview />
        </LiveProvider>

        <Text className="pt-2">
          Need to change something?{' '}
          <InlineLink
            style={{
              textDecoration: 'none',
            }}
            href={`https://github.com/algolia/docsearch-configs/blob/master/configs/${indexName}.json`}
          >
            Please submit a PR on your configuration
          </InlineLink>
          .
        </Text>

        <Text>
          <LabelText big>DocSearch on another website?</LabelText>
        </Text>

        <div className="jc-center fxd-column d-flex my-4">
          <Button
            primary
            style={{ textDecoration: 'none', alignItems: 'center' }}
            href={useBaseUrl('/apply')}
          >
            Join the Program
          </Button>
        </div>

        <Text>
          <LabelText big>Search for another demo</LabelText>
        </Text>

        <InstantSearch
          searchClient={searchClient.current}
          indexName="live-demo"
          classame="sbx-docsearch-demo__input"
        >
          <Configure filters="status.stage:Outbound" hitsPerPage={4} />

          <SearchBox showLoadingIndicator />

          <Results>
            <CustomHits />
          </Results>
        </InstantSearch>
      </Card>
    </>
  );
}
const Results = connectStateResults(
  ({ searchState, searchResults, children }) =>
    searchResults && searchResults.hits.filter(e => e.name).length !== 0 ? (
      children
    ) : (
      <div
        style={{ marginTop: '2rem', marginBottom: '2rem' }}
        className="jc-center fxd-column d-flex"
      >
        <Button
          primary
          style={{ textDecoration: 'none', alignItems: 'center' }}
          href={useBaseUrl('/apply')}
        >
          Apply for {searchState.query}
        </Button>
      </div>
    )
);

const CustomHits = connectHits(({ hits }) => (
  <ul>
    {hits
      .filter(e => e.name)
      .map(hit => (
        <li key={hit.objectID} style={{margin:"1rem"}}>
          <InlineLink
            style={{ textDecoration: 'none', alignItems: 'center' }}
            href={useBaseUrl(`/demo?indexName=${hit.docsearch.index}`)}
          >
            {hit.name}
          </InlineLink>
          - {hit.documentation.url}
        </li>
      ))}
  </ul>
));

function DemoPage() {
  return (
    <Layout
      title="DocSearch Demo"
      description="Try out the search for your DocSearch project"
    >
      <Demo />
    </Layout>
  );
}

export default DemoPage;
