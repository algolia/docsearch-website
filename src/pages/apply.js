import React, { useState } from 'react';
import Layout from '@theme/Layout';
import { Section, Hero } from '@algolia/ui-library';
import ApplyForm from '../components/ApplyForm.js';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

function Apply() {
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

  return (
    <Layout
      title="DocSearch: Search made for documentation"
      description="The easiest way to add search to your documentation - Powered by Algolia"
      theme={theme}
      setTheme={setTheme}
    >
      <Hero
        background="curves"
        title={<img src={logoUrl} alt="DocSearch" />}
      />
      <Section background={theme === 'dark' ? 'dark' : 'white'}>
        <ApplyForm theme={theme} />
      </Section>
    </Layout>
  );
}

export default Apply;
