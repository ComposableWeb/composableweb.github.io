import { Box, Flex, Heading } from '@chakra-ui/core';
import { BlocksControls, InlineText, InlineImage } from 'react-tinacms-inline';
import { InlineWysiwyg } from 'react-tinacms-editor';
import { SectionBlockData } from '~lib/blocks/section';

export type SectionEditableProps = {
  name: string;
  index: number;
  data: SectionBlockData;
};

export const SectionEditable: React.FC<SectionEditableProps> = (props: SectionEditableProps) => (
  <BlocksControls index={props.index}>
    <Flex>
      <InlineImage name="image" uploadDir={() => '/static/images/'} parse={(media) => media.id} />
      <Box p={10}>
        <Heading>
          <InlineText name="heading" />
        </Heading>
        <Heading as="h3">
          <InlineText name="subheading" />
        </Heading>
        <InlineWysiwyg name="content" format="markdown">
          {props.data.content}
        </InlineWysiwyg>
      </Box>
    </Flex>
  </BlocksControls>
);
export default SectionEditable;
