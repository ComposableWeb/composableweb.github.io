import { Heading as CHeading, HeadingProps } from '@chakra-ui/core';
import { PropsWithoutRef, PropsWithChildren } from 'react';

export const Heading: React.FC<HeadingProps> = (props: PropsWithoutRef<PropsWithChildren<HeadingProps>>) => (
  <CHeading fontWeight="500" lineHeight="shorter" mb="0.3em" mt="0.65em" {...props} />
);
export default Heading;
