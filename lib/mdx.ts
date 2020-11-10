import matter from 'gray-matter';
import mdxPrism from 'mdx-prism';
import remarkSlug from 'remark-slug';
import remarkAutolinkHeadings from 'remark-autolink-headings';
import remarkCodeTitles from 'remark-code-titles';
import readingTime from 'reading-time';

import MDXComponents from '~components/MDXComponents';
import { MarkdownFrontmatter } from './propTypes';

export const mdxRemoteOptions = {
  components: MDXComponents,
  mdxOptions: {
    remarkPlugins: [remarkSlug, remarkAutolinkHeadings, remarkCodeTitles],
    rehypePlugins: [mdxPrism],
    compilers: [],
    filepath: '/some/file/path',
  },
};
export interface IReadTimeResults {
  text: string;
  time: number;
  words: number;
  minutes: number;
}
export function mdxMatter<T extends MarkdownFrontmatter>(file, options = {}) {
  const { content, data } = matter(file, options);
  const dataReadingTime = enhanceFrontmatterReadingTime(content);
  return { content, data: { ...(data as T), ...dataReadingTime } };
}

export const enhanceFrontmatterReadingTime = (mdxContent): { wordCount: number; readingTime: IReadTimeResults } => {
  return {
    wordCount: mdxContent.split(/\s+/gu).length,
    readingTime: readingTime(mdxContent),
  };
};
export const enhanceFrontmatterPath = (frontMatter) => {
  const parts = frontMatter.__resourcePath.split('/');
  return {
    path: frontMatter.__resourcePath.replace('.mdx', ''),
    slug: parts[parts.length - 1].split('.').slice(0, -1).join('.'),
  };
};
