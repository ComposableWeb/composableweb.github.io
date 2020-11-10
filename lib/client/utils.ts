import hydrate from 'next-mdx-remote/hydrate';
import { mdxRemoteOptions } from '~lib/mdx';
import mergeDeep from '~lib/objectHelpers';

export const mdxHydrateMarkdown = (source, options) => {
  const defaultOptions = mdxRemoteOptions;
  return hydrate(source, mergeDeep(defaultOptions, options));
};
