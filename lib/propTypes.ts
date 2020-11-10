import { GithubError } from 'next-tinacms-github';
import { IReadTimeResults } from './mdx';

export type MarkdownPagePropsWrapper<T = MarkdownFrontmatter> = {
  props: MarkdownPageProps<T>;
};

export type MarkdownPageProps<T = MarkdownFrontmatter> = {
  file: MarkdownFileProps<T>;
  preview: boolean;
  error?: GithubError;
};

export type MarkdownFileData<T = MarkdownFrontmatter> = {
  frontmatter: T;
  markdownBody: string;
  markdownObject: { compiledSource: unknown; renderedOutput: string; scope: Record<string, unknown> };
};
export type MarkdownFileProps<T = MarkdownFrontmatter> = {
  fileRelativePath: string;
  data: MarkdownFileData<T>;
  sha: string;
};

export type MarkdownFrontmatter = Record<string, string | string[] | number | number[] | boolean | IReadTimeResults>;
