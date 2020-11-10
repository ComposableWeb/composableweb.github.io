import ErrorPage from 'next/error';
import dynamic from 'next/dynamic';
import { NextSeo } from 'next-seo';
import { getGithubPreviewProps, parseJson } from 'next-tinacms-github';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';

import { ResumeData } from 'lib/contentTypes';
import config from '../../config';
import Resume from '~components/Resume';
import { Spinner } from '@chakra-ui/core';

export type ResumePageProps = {
  file: {
    data: ResumeData;
    fileRelativePath: string;
  };
  preview: boolean;
};
const ResumeEditable = dynamic(() => import('~components/ResumeEditable'), {
  loading: () => <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />,
});

const ResumePage: NextPage<ResumePageProps> = (props) => {
  const router = useRouter();
  const url = `${config.common.url}${router.asPath}`;
  const title = `About Me & Resume | ${config.common.title}`;

  if (!router.isFallback && !props.file) {
    return <ErrorPage statusCode={404} />;
  }
  // in cases router params was not defined yet, file cannot be loaded in getStaticProps
  // @see: https://github.com/vercel/next.js/issues/8259
  if (!props.file) {
    return null;
  }
  if (props.preview) {
    return (
      <>
        <NextSeo
          title={title}
          description={props.file.data.basics.summary}
          canonical={url}
          openGraph={{
            url,
            title,
            description: props.file.data.basics.summary,
          }}
        />
        <ResumeEditable {...props} />
      </>
    );
  }
  return (
    <>
      <NextSeo
        title={title}
        description={props.file.data.basics.summary}
        canonical={url}
        openGraph={{
          url,
          title,
          description: props.file.data.basics.summary,
        }}
      />
      <Resume {...props} />
    </>
  );
};
export default ResumePage;

/**
 * Fetch data with getStaticProps based on 'preview' mode
 */
export const getStaticProps: GetStaticProps = async function ({ preview, previewData, params: { lang } }) {
  if (preview) {
    return getGithubPreviewProps({
      ...previewData,
      head_branch: process.env.NEXT_PUBLIC_BASE_BRANCH,
      fileRelativePath: `page-data/resume.${lang}.json`,
      parse: parseJson,
    });
  }
  return {
    props: {
      sourceProvider: null,
      error: null,
      preview: false,
      file: {
        fileRelativePath: `page-data/resume.${lang}.json`,
        data: (await import(`../../page-data/resume.${lang}.json`)).default,
      },
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const languages = ['en', 'de'];
  return {
    paths: languages.map((lang) => {
      return {
        params: {
          lang,
        },
      };
    }),
    fallback: false,
  };
};
