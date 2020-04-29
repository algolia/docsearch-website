import React, { useState, useEffect, useRef } from 'react';
import Layout from '@theme/Layout';
import { useLocation } from 'react-router';
import queryString from 'query-string';
import {
  Hero,
  Text,
  LabelText,
  InlineLink,
} from '@algolia/ui-library';
import DocSearch from '../components/DocSearch';
import ErrorBoundary from '../components/ErrorBoundary';

import algoliasearch from 'algoliasearch';

import Card from '@algolia/ui-library/public/components/Card';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { LiveProvider, LiveEditor } from 'react-live';
// import github from 'prism-react-renderer/themes/github';
import vsDark from 'prism-react-renderer/themes/vsDark';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import { useDocSearchContext } from '../hooks/useDocSearchContext';
import { Autocomplete } from '../components/Autocomplete';
import { getAlgoliaHits } from '@francoischalifour/autocomplete-preset-algolia';

function Demo() {
  const { siteConfig } = useDocusaurusContext();
  const { theme, logoUrl } = useDocSearchContext();

  const autocompleteSearchClient = algoliasearch(
    'DSW01O6QPF',
    'e55d03a808bad4e426d28fd4a1a18338'
  );

  const [indexName, setIndexName] = useState("docsearch");
  const [apiKey, setApiKey] = useState(null);
  const [projectName, setProjectName] = useState(null);
  // const [docsearchIssueUrl, setDocsearchIssueUrl] = useState(null);
  const [isShowing, setIsShowing] = useState(false);
  const [selection, setSelection] = useState(false);
  const [docsearchConfig, setDocsearchConfig] = useState({appId:null,indexName:null,apiKey:null});

  function resetCredentials() {
    setIndexName("docsearch");
    setApiKey("25626fae796133dc1e734c6bcaaeac3c");
    setProjectName("DocSearch");
  }
  
  const index = autocompleteSearchClient.initIndex('live-demo');

  useEffect(() => {
    if (!selection && !projectName) {
        index.search(indexName, {
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
            setDocsearchConfig({appId:"BH4D9OD16A",indexName:activeDocSearchIndex.docsearch.index,apiKey:activeDocSearchIndex.docsearch.apiKey});
            // setDocsearchIssueUrl(
            //   activeDocSearchIndex.outbound.docsearchIssueUrl
            // );
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
      <Hero background="orbInside" title="Demo" subtitle={`DocSearch for ${projectName}`} padding="small" />
      <Card
        background={theme === 'dark' ? 'dark' : 'light'}
        className="m-auto mb-4 "
        style={{ position: 'relative', maxWidth: '800px' }}
      >
      
      <div className="algolia-autocomplete-demo-settings">
        Demo Settings:
        <span className="algolia-autocomplete-button">
          <span className="algolia-autocomplete-button-label">UI</span>
          version 2
          <svg height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path></svg>
        </span>
        {!isShowing &&
          <button className="algolia-autocomplete-button" onClick={() => setIsShowing(true)}>
            <span className="algolia-autocomplete-button-label">Index</span>
            {indexName}
            <svg height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path></svg>
          </button>
        }
        {isShowing &&
      <Autocomplete
          // initialState= {{query: indexName}}
          autoFocus
          openOnFocus
          showCompletion
          placeholder="Search index..."
          getSources={() => {
            return [
              {
                onSelect: ({suggestion}) => {
                  // algoliasearch = null
                  setIsShowing(false);
                  setProjectName(suggestion.name);
                  setIndexName(suggestion.docsearch.index);
                  setApiKey(suggestion.docsearch.apiKey);
                  setDocsearchConfig({appId:"BH4D9OD16A",indexName:suggestion.docsearch.index,apiKey:suggestion.docsearch.apiKey});
                  // setDocsearchIssueUrl(
                  //   suggestion.outbound.docsearchIssueUrl
                  // );
                },
                getInputValue: ({ suggestion }) => suggestion.docsearch.index,
                getSuggestions({ query }) {
                  return getAlgoliaHits({
                    searchClient: autocompleteSearchClient,
                    queries: [
                      {
                        indexName: 'live-demo',
                        query,
                        params: {
                          filters: 'status.stage: "Outbound"',
                          hitsPerPage: 8,
                        },
                      },
                    ],
                  });
                },
              },
            ];
          }}
        />
        }
      </div>

        <ErrorBoundary>
          {docsearchConfig && (
            <DocSearch
              docsearchConfig={docsearchConfig}
            />
          )}
        </ErrorBoundary>
      </Card>

      <Card
        className="m-auto mb-4"
        style={{
          maxWidth: '800px',
          position: 'relative',
        }}
        background={theme === 'dark' ? 'dark' : 'light'}
      >

        <LabelText big>How to Install</LabelText>

        <Text className="mt-4">
          We have configured the crawler. It will run every 24 hours. You're now
          a few steps away from having it work on your website.
        </Text>


        {/* {docsearchIssueUrl && (
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
        )} */}

        <Text className="mt-4 mb-0">Include a search input:</Text>

        <LiveProvider
          code={`<input type="text" id="search" placeholder="Search the doc" />`}
          language="html"
          noInline={true}
          transformCode={_code =>
            `class Null extends React.Component {render(){return null}}`
          }
          theme={vsDark}
        >
          <LiveEditor />
        </LiveProvider>

        <Text className="mt-4 mb-0">Include these assets:</Text>

        <LiveProvider
          code={code}
          language="html"
          noInline={true}
          transformCode={_code =>
            `class Null extends React.Component {render(){return null}}`
          }
          theme={vsDark}
        >
          <LiveEditor />
        </LiveProvider>

        <Text className="pt-2">
          <InlineLink
            style={{
              textDecoration: 'none',
            }}
            href={`https://github.com/algolia/docsearch-configs/blob/master/configs/${indexName}.json`}
          >
            Edit this configuration
          </InlineLink>
          .
        </Text>
      </Card>
    </>
  );
}


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
