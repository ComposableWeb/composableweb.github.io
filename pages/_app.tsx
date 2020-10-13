import * as React from 'react';
import Head from 'next/head';
import GoogleFonts from 'next-google-fonts';

import { ChakraProvider as ThemeProvider } from '@chakra-ui/core';
import { DefaultSeo } from 'next-seo';
import App, { AppProps } from 'next/app';
import { TinaCMS, TinaProvider } from 'tinacms';
import { GithubClient, TinacmsGithubProvider } from 'react-tinacms-github';
import * as ackeeTracker from 'ackee-tracker';
import Router from 'next/router';

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
    this.cms = new TinaCMS({
      enabled: !!props.pageProps.preview,
      apis: {
        /**
         * 2. Register the GithubClient
         */
        github: new GithubClient({
          proxy: '/api/proxy-github',
          authCallbackRoute: '/api/create-github-access-token',
          clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
          baseRepoFullName: process.env.NEXT_PUBLIC_REPO_FULL_NAME,
          baseBranch: process.env.NEXT_PUBLIC_BASE_BRANCH,
        }),
      },
      /**
       * 3. Hide the Sidebar & Toolbar
       *    unless we're in Preview/Edit Mode
       */
      sidebar: props.pageProps.preview,
      toolbar: props.pageProps.preview,
    });
  }

  componentDidMount() {
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

  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <GoogleFonts href="https://fonts.googleapis.com/css2?family=Archivo+Narrow:wght@500&family=Barlow:wght@400;600&display=swap" />
        <Head>
          <meta content="width=device-width, initial-scale=1" name="viewport" />
          <meta content="#E2E8F0" name="theme-color" />
          <meta content="#E2E8F0" name="msapplication-TileColor" />
        </Head>
        <ThemeProvider theme={theme}>
          <DefaultSeo {...config.meta} />
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
