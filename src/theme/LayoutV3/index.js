/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState, useLayoutEffect } from 'react';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import NavbarV3 from '@theme/NavbarV3';
import Footer from '@theme/Footer';

import './styles.css';
import { useTheme } from '../../hooks/useTheme';
import { DocSearchContext } from '../../hooks/useDocSearchContext';

function LayoutV3(props) {
  const { siteConfig = {} } = useDocusaurusContext();
  const {
    favicon,
    tagline,
    title: defaultTitle,
    themeConfig: { image: defaultImage },
    url: siteUrl,
  } = siteConfig;
  const {
    children,
    title,
    noFooter,
    description,
    image,
    keywords,
    permalink,
    version,
  } = props;
  const metaTitle = title || `${defaultTitle} · ${tagline}`;
  const metaImage = image || defaultImage;
  const metaImageUrl = siteUrl + useBaseUrl(metaImage);
  const faviconUrl = useBaseUrl(favicon);
  const [theme, setTheme] = useTheme();
  const { logo: logoConfig } = siteConfig.themeConfig.navbar;
  const logoUrl = useBaseUrl(
    theme === 'dark' ? logoConfig.src_theme.dark : logoConfig.src_theme.light
  );

  return (
    <DocSearchContext.Provider value={{ theme, setTheme, logoUrl }}>
      <Head>
        <html lang="en" />

        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        {metaTitle && <title>{metaTitle}</title>}
        {metaTitle && <meta property="og:title" content={metaTitle} />}
        {favicon && <link rel="shortcut icon" href={faviconUrl} />}
        {description && <meta name="description" content={description} />}
        {description && (
          <meta property="og:description" content={description} />
        )}
        {version && <meta name="docsearch:version" content={version} />}
        {keywords && keywords.length && (
          <meta name="keywords" content={keywords.join(',')} />
        )}
        {metaImage && <meta property="og:image" content={metaImageUrl} />}
        {metaImage && <meta property="twitter:image" content={metaImageUrl} />}
        {metaImage && (
          <meta name="twitter:image:alt" content={`Image for ${metaTitle}`} />
        )}
        {permalink && <meta property="og:url" content={siteUrl + permalink} />}
        <meta name="twitter:card" content="summary" />
      </Head>

      <NavbarV3 />

      <div className="main-wrapper">{children}</div>

      {!noFooter && <Footer />}
    </DocSearchContext.Provider>
  );
}

export default LayoutV3;
