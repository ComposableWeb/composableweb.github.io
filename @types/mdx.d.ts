import { Frontmatter } from 'types/mdx';

declare module '*.mdx' {
  let MDXComponent: (props) => JSX.Element;
  export default MDXComponent;
  export const frontMatter: FrontMatter[] | Frontmatter;
}
