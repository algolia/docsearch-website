import React, { useState, useEffect, useCallback } from 'react';
import Layout from '@theme/Layout';
import {
  Hero,
  Text,
  LabelText,
  InlineLink,
  Card,
  Button,
} from '@algolia/ui-library';
import algoliasearch from 'algoliasearch/lite';
import { LiveProvider, LiveEditor } from 'react-live';
import vsDark from 'prism-react-renderer/themes/vsDark';
import { getAlgoliaHits } from '@francoischalifour/autocomplete-preset-algolia';

import DocSearchV2 from '../components/DocSearch';
import ErrorBoundary from '../components/ErrorBoundary';
import { useDocSearchContext } from '../hooks/useDocSearchContext';
import { Autocomplete } from '../components/Autocomplete';

import { createPortal } from 'react-dom';
import Link from '@docusaurus/Link';

import queryString from 'query-string';
import { useLocation } from 'react-router';

const autocompleteSearchClient = algoliasearch(
  'DSW01O6QPF',
  'e55d03a808bad4e426d28fd4a1a18338'
);
const autocompleteIndex = autocompleteSearchClient.initIndex('live-demo');

const defaultProject = {
  projectName: 'DocSearch',
  indexName: 'docsearch',
  apiKey: '25626fae796133dc1e734c6bcaaeac3c',
};

function VersionSelector(props) {
  return (
    <span className="algolia-autocomplete-button">
      <span className="algolia-autocomplete-button-label">UI</span>

      <select
        id="docsearch-version-select"
        className="algolia-autocomplete-button-select"
        onChange={event => {
          props.onChange(Number(event.target.value));
        }}
      >
        <option value="2" selected={props.selected === 2}>
          version 2
        </option>
        <option value="3" selected={props.selected === 3}>
          version 3
        </option>
      </select>
    </span>
  );
}

let DocSearchModal = null;

function DocSearchIndexSelector(props) {
  const [isOpen, setIsOpen] = useState(false);

  if (isOpen) {
    return (
      <Autocomplete
        autoFocus
        openOnFocus
        showCompletion
        placeholder="Search a demo"
        getSources={() => {
          return [
            {
              onSelect: ({ suggestion }) => {
                props.onChange({
                  projectName: suggestion.name,
                  indexName: suggestion.docsearch.index,
                  apiKey: suggestion.docsearch.apiKey,
                });
                setIsOpen(false);
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
                        facetFilters: [
                          ['status.stage:Outbound', 'status.stage:Live'],
                        ],
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
    );
  }

  return (
    <button
      className="algolia-autocomplete-button"
      onClick={() => setIsOpen(true)}
    >
      <span className="algolia-autocomplete-button-label">Index</span>
      {props.project.indexName}
      <svg
        height="20"
        width="20"
        viewBox="0 0 20 20"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
      </svg>
    </button>
  );
}

function Hit({ hit, children }) {
  return <Link to={hit.url}>{children}</Link>;
}

function Demo() {
  const { theme } = useDocSearchContext();

  const [version, setVersion] = useState(2);
  const [project, setProject] = useState(defaultProject);

  function resetCredentials() {
    setProject(defaultProject);
  }

  const {
    indexName: indexNameQS = null,
    apiKey: apiKeyQS = null,
    v3 = false,
  } = queryString.parse(useLocation().search);

  const [isV3, setIsV3] = useState(v3);

  useEffect(() => {
    setIsV3(isV3);
    if (isV3) setVersion(3);
  }, [isV3]);

  const [isOpen, setIsOpen] = useState(false);

  const importDocSearchModalIfNeeded = useCallback(
    function importDocSearchModalIfNeeded() {
      if (DocSearchModal) {
        return Promise.resolve();
      }

      return Promise.all([
        import('@docsearch/react/modal'),
        import('@docsearch/react/style'),
      ]).then(([{ DocSearchModal: Modal }]) => {
        DocSearchModal = Modal;
      });
    },
    []
  );

  const onOpen = useCallback(
    function onOpen() {
      importDocSearchModalIfNeeded().then(() => {
        setIsOpen(true);
      });
    },
    [importDocSearchModalIfNeeded, setIsOpen]
  );
  const onClose = useCallback(
    function onClose() {
      setIsOpen(false);
    },
    [setIsOpen]
  );

  useEffect(() => {
    if (indexNameQS && apiKeyQS) {
      setProject({
        projectName: `DocSearch on ${indexNameQS}`,
        indexName: indexNameQS,
        apiKey: apiKeyQS,
      });
    } else {
      autocompleteIndex
        .search(project.indexName, { hitsPerPage: 1 })
        .then(result => {
          if (result.nbHits === 0) {
            resetCredentials();
          } else {
            const activeDocSearchIndex = result.hits[0];
            setProject({
              projectName: activeDocSearchIndex.name,
              indexName: activeDocSearchIndex.docsearch.index,
              apiKey: activeDocSearchIndex.docsearch.apiKey,
            });
          }
        })
        .catch(() => {
          resetCredentials();
        });
    }
  }, [project.indexName, indexNameQS, apiKeyQS]);

  const code = `<!-- at the end of the \`head\` -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.css" />

<!-- at the end of the \`body\` -->
<script src="https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.js"></script>
<script>
  docsearch({
    apiKey: '${project.apiKey}',
    indexName: '${project.indexName}',
    inputSelector: '#search', // CSS selector to target the <input />
    debug: false, // Set to \`true\` if you want to inspect the dropdown
  });
</script>`;

  return (
    <>
      <Hero
        background="orbInside"
        title="Demo"
        subtitle={`DocSearch for ${project.projectName}`}
        padding="small"
      />
      <Card
        background={theme === 'dark' ? 'dark' : 'light'}
        className="m-auto mb-4 "
        style={{ position: 'relative', maxWidth: '800px' }}
      >
        <div className="algolia-autocomplete-demo-settings">
          Demo Settings:
          <VersionSelector
            selected={version}
            onChange={nextVersion => setVersion(nextVersion)}
          />
          <DocSearchIndexSelector
            project={project}
            onChange={nextProject => setProject(nextProject)}
          />
        </div>

        {version === 2 ? (
          <ErrorBoundary>
            <DocSearchV2 {...project} />
          </ErrorBoundary>
        ) : (
          <div className="uil-ph-32 uil-ta-center uil-d-flex uil-fxd-column">
            <Button
              onClick={onOpen}
              className="uil-mt-16 uil-mb-16 uil-m-auto"
              tag="button"
              type="submit"
              id="searchButton"
              primary
            >
              Open modal to search on {project.indexName}
            </Button>
            {isOpen &&
              createPortal(
                <DocSearchModal
                  {...project}
                  navigator={{
                    navigate({ suggestionUrl }) {
                      history.push(suggestionUrl);
                    },
                  }}
                  onClose={onClose}
                  transformItems={items => {
                    return items.map(item => {
                      const url = new URL(item.url);

                      return {
                        ...item,
                        url: item.url.replace(url.origin, ''),
                      };
                    });
                  }}
                  hitComponent={Hit}
                />,
                document.body
              )}
          </div>
        )}
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
            href={`https://github.com/algolia/docsearch-configs/blob/master/configs/${project.indexName}.json`}
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
