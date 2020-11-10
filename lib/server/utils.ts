import renderToString from 'next-mdx-remote/render-to-string';
import fg from 'fast-glob';
import fs from 'fs';
import path from 'path';
import { getGithubPreviewProps, parseMarkdown, GithubPreviewProps } from 'next-tinacms-github';
import { MarkdownPageProps, MarkdownFileProps, MarkdownFrontmatter, MarkdownFileData } from '../propTypes';
import mergeDeep from '~lib/objectHelpers';
import { mdxRemoteOptions, mdxMatter } from '~lib/mdx';

export async function fetchMarkdownDoc<T extends MarkdownFrontmatter>(
  subdir = 'blog',
  fileName: string
): Promise<MarkdownFileProps<T>> {
  const fileRelativePath = `content/${subdir}/${fileName}`;
  const fullPath = path.resolve(fileRelativePath);

  const file = fs.readFileSync(fullPath);
  const { content, data } = mdxMatter<T>(file);
  const mdxSource = await mdxRenderToString(content, { scope: data });
  return {
    fileRelativePath,
    data: {
      frontmatter: data,
      markdownBody: mdxSource.renderedOutput,
      markdownObject: mdxSource,
    },
    sha: '',
  } as MarkdownFileProps<T>;
}

export async function fetchAllMarkdownDocs<T extends MarkdownFrontmatter>(
  subdir = 'blog'
): Promise<MarkdownFileProps<T>[]> {
  const files = await fg(`./content/${subdir}/**/*.{md,mdx}`);

  return Promise.all(
    files.map((fileName: string) => {
      const parts = fileName.split('/');
      return fetchMarkdownDoc<T>(subdir, parts[parts.length - 1]);
    })
  );
}

export type NotFoundProps = { props: { preview: boolean; file: boolean; error: string | undefined } };
export const getMarkdownProps = async <T extends MarkdownFrontmatter>(
  subdir = 'blog',
  slug: string,
  preview: boolean,
  previewData: { github_access_token: string; working_repo_full_name: string; head_branch: string }
): Promise<{ props: MarkdownPageProps<T> } | GithubPreviewProps<MarkdownFileData<T>> | NotFoundProps> => {
  let fileName: string;
  if (fs.existsSync(`content/${subdir}/${slug}.mdx`)) {
    fileName = `${slug}.mdx`;
  } else if (fs.existsSync(`content/${subdir}/${slug}.md`)) {
    fileName = `${slug}.md`;
  } else {
    return { props: { preview: false, file: false, error: 'file not found' } };
  }
  const fileRelativePath = `content/${subdir}/${fileName}`;
  if (preview) {
    const previewProps = await getGithubPreviewProps<MarkdownFileData<T>>({
      ...previewData,
      working_repo_full_name: process.env.NEXT_PUBLIC_REPO_FULL_NAME,
      head_branch: process.env.NEXT_PUBLIC_BASE_BRANCH,
      fileRelativePath: fileRelativePath,
      parse: parseMarkdown as any,
    });
    const markdownObject = await mdxRenderToString(previewProps.props.file.data.markdownBody, {
      scope: previewProps.props.file.data.frontmatter,
    });
    return {
      props: {
        ...previewProps.props,
        file: { ...previewProps.props.file, data: { ...previewProps.props.file.data, markdownObject } },
      },
    };
  }
  const file = await fetchMarkdownDoc<T>(subdir, fileName);
  return {
    props: {
      error: null,
      preview: false,
      file,
    },
  };
};

export const mdxRenderToString = (source, options) => {
  const defaultOptions = mdxRemoteOptions;
  return renderToString(source, mergeDeep(defaultOptions, options));
};
