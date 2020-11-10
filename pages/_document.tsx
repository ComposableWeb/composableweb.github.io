import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ColorModeScript } from '@chakra-ui/core';
import { ServerStyleSheet } from 'styled-components';

const Doc = () => {
  return (
    <Html lang="en">
      <Head>
        <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
        <meta content="#E2E8F0" name="theme-color" />
        <meta content="#E2E8F0" name="msapplication-TileColor" />
        <meta content="/static/browserconfig.xml" name="msapplication-config" />
        <link href="/static/favicons/favicon.ico" rel="shortcut icon" />
        <link href="/static/favicons/apple-touch-icon.png" rel="apple-touch-icon" sizes="180x180" />
        <link href="/static/favicons/favicon-32x32.png" rel="icon" sizes="32x32" type="image/png" />
        <link href="/static/favicons/favicon-16x16.png" rel="icon" sizes="16x16" type="image/png" />
        <link color="#4a9885" href="/static/favicons/safari-pinned-tab.svg" rel="mask-icon" />
        <link rel="preconnect" href="https://fonts.gstatic.com/" crossOrigin="" />
        <link href="/static/favicons/site.webmanifest" rel="manifest" />
      </Head>
      <body>
        <ColorModeScript initialColorMode="dark" />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

class MyDocument extends Document {
  static async getInitialProps(ctx): Promise<any> {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }
  public render(): JSX.Element {
    return <Doc />;
  }
}

export default MyDocument;
