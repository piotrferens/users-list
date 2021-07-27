import type { AppProps } from 'next/app';

import { CreatePageComponent, defaultPageMeta } from '../createPage';

export type OwnAppProps = AppProps & { Component: CreatePageComponent };

const App = ({ Component, pageProps }: OwnAppProps): JSX.Element => {
  const pageMeta = Component.meta || defaultPageMeta;

  const page = pageMeta.renderLayout({
    page: <Component {...pageProps} />,
    pageProps: pageProps,
  });

  return page;
};

export default App;
