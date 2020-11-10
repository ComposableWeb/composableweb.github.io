import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import dynamic from 'next/dynamic';
import fg from 'fast-glob';

import { GithubPreviewProps } from 'next-tinacms-github';

import { getMarkdownProps } from '~lib/server/utils';
import { slugFromFilepath } from 'lib/slugHelpers';
import { MarkdownPageProps, MarkdownFileData, MarkdownFileProps } from '~lib/propTypes';
import { PostFrontmatter } from '~lib/contentTypes';
import { Article } from '~components/Article';
import { Spinner } from '@chakra-ui/core';

const ArticleEditable = dynamic(() => import('~components/ArticleEditable'), {
  loading: () => <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />,
});
export type ArticleProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function ArticlePage({ file, error, ...props }: ArticleProps): React.ReactElement {
  const router = useRouter();

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  if (error) {
    return <ErrorPage statusCode={500} />;
  }
  if (!router.isFallback && !file) {
    return <ErrorPage statusCode={404} />;
  }
  // in cases router params was not defined yet, file cannot be loaded in getStaticProps
  // @see: https://github.com/vercel/next.js/issues/8259
  if (!file) {
    return null;
  }
  if (props.preview) {
    return <ArticleEditable file={file as MarkdownFileProps<PostFrontmatter>} {...props} />;
  }

  return <Article file={file as MarkdownFileProps<PostFrontmatter>} {...props} />;
}

export const getStaticProps: GetStaticProps<
  | MarkdownPageProps<PostFrontmatter>
  | GithubPreviewProps<MarkdownFileData<PostFrontmatter>>['props']
  | { preview: boolean; file: boolean; error: string | undefined }
> = async function ({ preview, previewData, params: { slug, contentType } }) {
  if (!slug || !slug.length) {
    return { props: { preview: false, file: false, error: 'invalid slug' } };
  }
  return await getMarkdownProps<PostFrontmatter>(contentType as string, slug as string, preview, previewData);
};

export const getStaticPaths: GetStaticPaths = async () => {
  const directories = await fg(`**`, { onlyDirectories: true, cwd: './content', deep: 1 });
  const posts = await Promise.all(
    directories.map((dir) =>
      fg(`${dir}/*.{md,mdx}`, { onlyFiles: true, cwd: './content', deep: 1 }).then((paths) =>
        paths.map((path) => ({
          path,
          dir,
        }))
      )
    )
  );
  return {
    paths: posts.flat().map((post) => {
      return {
        params: {
          slug: `${slugFromFilepath(post.path)}`,
          contentType: post.dir,
        },
      };
    }),
    fallback: true,
  };
};
