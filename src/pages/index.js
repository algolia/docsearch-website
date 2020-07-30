import React from 'react';
import {
  LightCta,
  Section,
  SectionTitle,
  Button,
  Text,
  TextBlock,
  Hero,
  SectionHeader,
  LabelText,
  TextBlocksGrid,
  Card,
  CardsGrid,
} from '@algolia/ui-library';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';

import showcaseProjects from './showcase-projects.json';
import demoProjects from './demo-projects.json';
import ApplyForm from '../components/ApplyForm.js';
import { DocSearchLogo } from '../components/DocSearchLogo';

function Home() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <>
      <Hero
        id="hero"
        background="curves"
        title={<DocSearchLogo width="50%" />}
        subtitle={siteConfig.tagline}
        cta={[
          <Button
            primary
            style={{ textDecoration: 'none' }}
            href={useBaseUrl('/apply')}
          >
            Join the Program
          </Button>,
        ]}
      />

      <Section>
        <SectionHeader title="State-of-the-art search for technical documentation">
          <Text className="m-auto" style={{ maxWidth: '800px' }}>
            We're kind of scratching our own itch here. As developers, we spend
            a lot of time reading documentation, and it isn’t always easy to
            find the information we need.
          </Text>
          <Text className="m-auto" style={{ maxWidth: '800px' }}>
            No one's to blame, building a good search is a complex challenge. We
            just happen to have a lot of experience doing that, and we want to
            share it with the developer community.
          </Text>
        </SectionHeader>
      </Section>

      <Section background="white">
        <SectionHeader title="Providing search to your favorite projects" />
        <div
          className="jc-between d-flex m-auto fx-wrap"
          style={{ maxWidth: '800px' }}
        >
          {showcaseProjects.map(({ name, href, image }) => (
            <div key={href} className="ta-center w-20p">
              <a
                href={href}
                rel="noreferrer"
                target="_blank"
                alt={`Discover DocSearch on the ${name} documentation`}
              >
                <img
                  className="h-50"
                  src={useBaseUrl(image)}
                  alt={`Discover DocSearch on the ${name} documentation`}
                />
                <LabelText font="hind" tag="p">
                  {name}
                </LabelText>
              </a>
            </div>
          ))}

          <div className="ta-center w-20p">
            <a href={useBaseUrl('/apply')} rel="noreferrer" target="_blank">
              <img
                className="h-50"
                src={useBaseUrl('img/logos/three-dots.svg')}
                alt="Your project logo? Apply for DocSearch"
              />
              <LabelText font="hind" tag="p">
                You?
              </LabelText>
            </a>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeader title="Learn-as-you-type experience">
          <Text className="m-auto" style={{ maxWidth: '800px' }}>
            Documentation speaks to your users. Ideally, this conversation will
            be pleasant and efficient. Everyone visiting your documentation page
            has a different need: Some are exploring your product, some are
            trying to get started, and some are stuck and need help.
          </Text>
          <Text className="m-auto" style={{ maxWidth: '800px' }}>
            DocSearch is designed to provide relevant search results at every
            level. Its structured layout give the users more context to
            understand the product.
          </Text>
        </SectionHeader>
        <img
          src={useBaseUrl('img/assets/docsearch-ui-anatomy.png')}
          alt="Anatomy of DocSearch UI"
        />
      </Section>

      <Section className="bg-analytics">
        <div className="row">
          <div className="col col--4 col--offset-1">
            <img
              className="d-block m-auto"
              src={useBaseUrl('img/assets/illus-analytics.svg')}
              alt="DocSearch Analytics"
            />
          </div>
          <div className="col col--5 pt-48 mt-32">
            <SectionTitle>Powerful Analytics with Algolia</SectionTitle>
            <Text>
              Follow your users' search behavior to get invaluable insights into
              what they are doing and to improve their experience - and to help
              them learn more about your product.
            </Text>
            <Text>
              Use metrics such as Popular Queries, No Results, and Click
              Position to better optimize your content.
            </Text>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeader title="How it works" />
        <TextBlocksGrid numbered columnsPerRow={3}>
          <TextBlock title="We scrape your documentation" label="Scraping">
            <Text>
              We built a website crawler designed to index every section of your
              documentation.
            </Text>
            <Text>
              Just send us the URL of your documentation, and we’ll run the
              scraper every 24h so you’re always up-to-date.
            </Text>
          </TextBlock>
          <TextBlock title="We configure your search" label="Configuration">
            <Text>
              You don’t need to configure any settings or even have an Algolia
              account.
            </Text>
            <Text>
              We take care of this automatically to ensure the best
              documentation search experience.
            </Text>
          </TextBlock>
          <TextBlock
            title="You add docsearch.js to your docs"
            label="Implementation"
          >
            <Text>
              We'll send you a script that integrates Algolia's autocomplete to
              power your search.
            </Text>
            <Text>
              You will receive the same speed, relevance, and best-in-class UX
              as our paying customers.
            </Text>
          </TextBlock>
        </TextBlocksGrid>
      </Section>

      <Section>
        <SectionHeader title="Try it live">
          <Text>
            We helped integrate DocSearch into several open source projects. Try
            it live.
          </Text>
        </SectionHeader>
        <CardsGrid columnsPerRow={demoProjects.length}>
          {demoProjects.map(({ name, href, logo, preview }) => (
            <Card
              key={name}
              image={preview}
              imageProps={{ alt: `${name} demo` }}
            >
              <LightCta withArrow href={href} rel="noreferrer" target="_blank">
                <img
                  style={{
                    marginTop: '-2px',
                    marginRight: '12px',
                  }}
                  className={'h-30 va-middle'}
                  src={useBaseUrl(logo)}
                  alt={name}
                />
                Visit {name}
              </LightCta>
            </Card>
          ))}
        </CardsGrid>
      </Section>

      <Section>
        <SectionHeader title="Join the DocSearch program">
          <Text>
            We’ll get back to you with everything you need to integrate your new
            search into your website.
          </Text>
          <Text>Oh, and did we mention it's FREE?</Text>
          <Text>No commitment. No subscription. Everything is on us!</Text>
        </SectionHeader>

        <ApplyForm />
      </Section>
    </>
  );
}

function HomePage() {
  return (
    <Layout
      title="DocSearch: Search made for documentation"
      description="The easiest way to add search to your documentation - Powered by Algolia"
    >
      <Home />
    </Layout>
  );
}

export default HomePage;
