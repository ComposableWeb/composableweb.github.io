import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { Text, Spinner } from '@chakra-ui/core';

import { Form } from 'tinacms';
import { InlineText, InlineTextarea } from 'react-tinacms-inline';
import { InlineWysiwyg } from 'react-tinacms-editor';
import { useGithubMarkdownForm } from 'react-tinacms-github';
import { GitFile } from 'react-tinacms-github/dist/src/form/useGitFileSha';

import { CodeRecipeFrontmatter, PostFrontmatter } from '~lib/contentTypes';
import { titelize } from 'lib/slugHelpers';
import { MarkdownFileData } from '~lib/propTypes';
import Layout from '~components/ArticleLayout';
import OpenAuthoringInlineForm from '~components/OpenAuthoringInlineForm';
import Heading from '~components/Heading';
import config from '../../config';
import { GithubPreviewProps } from 'next-tinacms-github';

export const ArticleEditable = ({
  file,
}: Omit<GithubPreviewProps<MarkdownFileData<PostFrontmatter>>['props'], 'error'>): React.ReactElement => {
  const router = useRouter();
  const url = `${config.common.url}${router.asPath}`;
  const formConfig = {
    label: 'Post',
    fields: [
      {
        name: 'frontmatter.title',
        label: 'Title',
        component: 'text',
      },
      {
        name: 'frontmatter.summary',
        label: 'Summary',
        component: 'textarea',
      },
      {
        name: 'frontmatter.tags',
        label: 'Tags',
        component: 'tags',
      },
      // {
      //   name: 'markdownBody',
      //   label: 'Content',
      //   component: 'markdown',
      // },
    ],
  };

  // Registers Tina Form
  const [data, form] = useGithubMarkdownForm(file as GitFile<MarkdownFileData<CodeRecipeFrontmatter>>, formConfig) as [
    MarkdownFileData<CodeRecipeFrontmatter>,
    Form
  ];

  const frontmatter = data.frontmatter;
  const markdownBody = data.markdownBody;
  const title = `${titelize(frontmatter.title)} | ${config.common.title}`;
  const description =
    frontmatter.summary ||
    'Ideas and experiments in rapid prototyping, Front-End Development, Technical Leadership and Enterprise Architecture';
  return (
    <OpenAuthoringInlineForm form={form}>
      <NextSeo
        title={title}
        description={description}
        canonical={url}
        openGraph={{
          url,
          title,
          description,
        }}
      />
      <Layout>
        {router.isFallback ? (
          <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
        ) : (
          <>
            <Heading as="h1">
              <InlineText name="frontmatter.title" />
            </Heading>
            {frontmatter.summary && (
              <Text as="p">
                <InlineTextarea name="frontmatter.summary" />
              </Text>
            )}

            <InlineWysiwyg name="markdownBody" format="markdown">
              {markdownBody}
            </InlineWysiwyg>
          </>
        )}
      </Layout>
    </OpenAuthoringInlineForm>
  );
};
export default ArticleEditable;
