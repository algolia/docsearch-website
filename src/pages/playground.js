import React, { useState, useRef, useEffect } from 'react';
import Layout from '@theme/Layout';
import { useLocation } from 'react-router';
import queryString from 'query-string';
import {
  Button,
  Section,
  Hero,
  SectionHeader,
  Text,
  Input,
  LabelText,
} from '@algolia/ui-library';

const useInput = (placeholder, defaultValue = '') => {
  const [value, setValue] = useState(defaultValue);
  const input = (
    <Input
      value={value}
      onChange={e => setValue(e.target.value)}
      placeholder={placeholder}
      required
    />
  );
  return [value, input];
};

function Playground(props) {
  const {
    indexName: indexNameInit = 'docsearch',
    apiKey: apiKeyInit = '25626fae796133dc1e734c6bcaaeac3c',
  } = queryString.parse(useLocation().search);
  const [count, setCount] = useState(0);
  const prevCountRef = useRef();
  useEffect(() => {
    prevCountRef.current = count;
  });
  const prevCount = prevCountRef.current;
  const [indexName, indexNameInput] = useInput('indexName', indexNameInit);
  const [apiKey, apiKeyInput] = useInput('apiKey', apiKeyInit);

  return (
    <Layout
      title="DocSearch Playground"
      description="Try out the search for your DocSearch project"
    >
      <Hero
        style={{ backgroundImage: 'linear-gradient(#fff, #f5f5fa)' }}
        background="curves"
        title="Playground"
      />
      <Section>
        <SectionHeader title="Try it out live">
          <Text>Try the new UI of DocSearch with your own project</Text>
        </SectionHeader>
        <div
          className="jc-between d-flex m-auto fx-wrap"
          style={{ maxWidth: '800px' }}
        >
          <div className="ta-left w-40p m-auto">
            <LabelText>Your indexName</LabelText>
            {indexNameInput}
          </div>
          <div className="ta-left w-40p m-auto">
            <LabelText>Your apiKey</LabelText>
            {apiKeyInput}
          </div>
          <div className="ta-center w-10p">
            <Button
              className="uil-mt-16 uil-mb-16"
              tag={({ className, children }) => (
                <button
                  className={className}
                  onClick={() => setCount(count + 1)}
                >
                  {children}
                </button>
              )}
              id="run"
              primary
            >
              Run
            </Button>
          </div>
        </div>
      </Section>
      <Section>
        <SectionHeader title="Play with it">
          <Text style={{ maxWidth: '800px' }}>
            You clicked {prevCount >= 0 ? 'Yes' : 'No'} {apiKey} {indexName}
          </Text>
        </SectionHeader>
      </Section>
    </Layout>
  );
}

export default Playground;
