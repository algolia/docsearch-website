import React, { useState } from 'react';
import Layout from '@theme/Layout';
import { Section, Hero } from '@algolia/ui-library';
import ApplyForm from '../components/ApplyForm.js';
import { DocSearchLogo } from '../components/DocSearchLogo';

import { useDocSearchContext } from '../hooks/useDocSearchContext';

function Apply() {
  const { theme, logoUrl } = useDocSearchContext();

  return (
    <>
      <Hero background="curves" title={<DocSearchLogo big/>} />
      <Section>
        <ApplyForm theme={theme} />
      </Section>
    </>
  );
}

function ApplyPage() {
  return (
    <Layout
      title="DocSearch: Search made for documentation"
      description="The easiest way to add search to your documentation - Powered by Algolia"
    >
      <Apply />
    </Layout>
  );
}

export default ApplyPage;
