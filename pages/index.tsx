import { GetStaticProps, NextPage } from 'next';

import { getGithubPreviewProps, parseJson } from 'next-tinacms-github';
import { SectionBlock, SectionBlockData } from '~lib/blocks';
import OpenAuthoringInlineForm from '~components/OpenAuthoringInlineForm';
import { useGithubJsonForm } from 'react-tinacms-github';
import { InlineBlocks } from 'react-tinacms-inline';
import { GitFile } from 'react-tinacms-github/dist/src/form/useGitFileSha';
import SectionEditable from '~components/SectionEditable';
import { Section } from '~components/Section';

export type HomePageProps = {
  file: {
    data: { blocks: SectionBlockData[] };
    fileRelativePath: string;
  };
  preview: boolean;
};

const PAGE_BLOCKS = {
  section: {
    Component: SectionEditable,
    template: SectionBlock,
  },
};
const HomePageForm: React.FC<HomePageProps> = ({ file }: HomePageProps) => {
  const [, form] = useGithubJsonForm(file as GitFile<HomePageProps['file']['data']>);

  return (
    <OpenAuthoringInlineForm form={form}>
      <InlineBlocks name="blocks" blocks={PAGE_BLOCKS} />
    </OpenAuthoringInlineForm>
  );
};

const HomePage: NextPage<HomePageProps> = ({ preview, file }) => {
  if (preview) {
    return <HomePageForm preview={preview} file={file}></HomePageForm>;
  }
  const {
    data: { blocks },
  } = file;
  return (
    <>
      {blocks.map((block, index) => (
        <Section key={index} data={block} />
      ))}
    </>
  );
};
export default HomePage;

/**
 * Fetch data with getStaticProps based on 'preview' mode
 */
export const getStaticProps: GetStaticProps = async function ({ preview, previewData }) {
  if (preview) {
    return getGithubPreviewProps({
      ...previewData,
      head_branch: process.env.NEXT_PUBLIC_BASE_BRANCH,
      fileRelativePath: `page-data/home.en.json`,
      parse: parseJson,
    });
  }
  return {
    props: {
      sourceProvider: null,
      error: null,
      preview: false,
      file: {
        fileRelativePath: `page-data/home.en.json`,
        data: (await import(`../page-data/home.en.json`)).default,
      },
    },
  };
};
