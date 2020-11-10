import * as React from 'react';
import Head from 'next/head';
import GoogleFonts from 'next-google-fonts';
import Router from 'next/router';
import { DefaultSeo } from 'next-seo';
import App, { AppProps } from 'next/app';
import { ChakraProvider as ThemeProvider } from '@chakra-ui/core';
import * as ackeeTracker from 'ackee-tracker';

import { TinaCMS, TinaProvider } from 'tinacms';
import { GithubClient, TinacmsGithubProvider } from 'react-tinacms-github';
import { NextGithubMediaStore } from 'next-tinacms-github';
import { DateFieldPlugin } from 'react-tinacms-date';

import config from '../config';
import theme from '../styles';
import PageLayout from '~components/PageLayout';

export default class Site extends App {
  cms: TinaCMS;

  constructor(props: AppProps) {
    super(props);
    /**
     * 1. Create the TinaCMS instance
     */
    const githubClient = new GithubClient({
      proxy: '/api/proxy-github',
      authCallbackRoute: '/api/create-github-access-token',
      clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
      baseRepoFullName: process.env.NEXT_PUBLIC_REPO_FULL_NAME,
      baseBranch: process.env.NEXT_PUBLIC_BASE_BRANCH,
    });
    const mediaStore = new NextGithubMediaStore(githubClient);
    const cms = new TinaCMS({
      enabled: !!props.pageProps.preview,
      apis: {
        /**
         * 2. Register the GithubClient
         */
        github: githubClient,
      },
      media: mediaStore,
      plugins: [DateFieldPlugin],
      /**
       * 3. Hide the Sidebar & Toolbar
       *    unless we're in Preview/Edit Mode
       */
      sidebar: props.pageProps.preview,
      toolbar: props.pageProps.preview,
    });
    this.cms = cms;
    import('react-tinacms-editor').then(({ MarkdownFieldPlugin }) => {
      cms.plugins.add(MarkdownFieldPlugin);
    });
  }

  componentDidMount(): void {
    if (typeof window !== 'undefined') {
      const ackeeTrackerInstance = ackeeTracker.create(
        {
          server: process.env.NEXT_PUBLIC_ACKEE_URL,
          domainId: process.env.NEXT_PUBLIC_ACKEE_ID,
        },
        {
          ignoreLocalhost: true,
          detailed: true,
        }
      );
      ackeeTrackerInstance.record();

      Router.events.on('routeChangeComplete', ackeeTrackerInstance.record());
    }
  }

  render(): React.ReactElement {
    const { Component, pageProps } = this.props;
    return (
      <>
        <GoogleFonts href="https://fonts.googleapis.com/css2?family=Archivo+Narrow:wght@500&family=Barlow:wght@400;600&display=swap" />
        <Head>
          <meta content="width=device-width, initial-scale=1" name="viewport" />
          <meta content="#E2E8F0" name="theme-color" />
          <meta content="#E2E8F0" name="msapplication-TileColor" />
        </Head>
        <DefaultSeo {...config.meta} />
        <ThemeProvider theme={theme}>
          <TinaProvider cms={this.cms}>
            <TinacmsGithubProvider onLogin={onLogin} onLogout={onLogout} error={pageProps.error}>
              <PageLayout>
                <Component {...pageProps} />
              </PageLayout>
            </TinacmsGithubProvider>
          </TinaProvider>
        </ThemeProvider>
      </>
    );
  }
}

const onLogin = async () => {
  const token = localStorage.getItem('tinacms-github-token') || null;
  const headers = new Headers();

  if (token) {
    headers.append('Authorization', 'Bearer ' + token);
  }

  const resp = await fetch(`/api/preview`, { headers: headers });
  const data = await resp.json();

  if (resp.status == 200) window.location.href = window.location.pathname;
  else throw new Error(data.message);
};

const onLogout = () => {
  return fetch(`/api/reset-preview`).then(() => {
    window.location.reload();
  });
};
