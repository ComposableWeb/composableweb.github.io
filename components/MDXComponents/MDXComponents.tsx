/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { Box, Alert, Code, HeadingProps, Kbd, Link, Text, Divider, useColorMode, Image } from '@chakra-ui/core';
import { PropsWithChildren } from 'react';
import NextLink from 'next/link';

import Heading from '~components/Heading';

const Table = (props) => (
  <Box overflowX="scroll" w="full">
    <Box as="table" textAlign="left" mt="32px" w="full" {...props} />
  </Box>
);

const THead = (props) => {
  const { colorMode } = useColorMode();
  const bg = {
    light: 'gray.50',
    dark: 'whiteAlpha.100',
  };

  return <Box as="th" bg={bg[colorMode]} fontWeight="semibold" p={2} fontSize="sm" {...props} />;
};

const TData = (props) => (
  <Box as="td" p={2} borderTopWidth="1px" borderColor="inherit" fontSize="sm" whiteSpace="normal" {...props} />
);

const CustomLink = (props) => {
  const { colorMode } = useColorMode();
  const color = {
    light: 'hsl(208, 99%, 44%)',
    dark: 'hsl(208, 95%, 68%)',
  };

  const href = props.href;
  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'));

  if (isInternalLink) {
    return (
      <NextLink href={href} passHref>
        <Link color={color[colorMode]} {...props} />
      </NextLink>
    );
  }

  return <Link color={color[colorMode]} isExternal {...props} />;
};

const Quote = (props) => {
  return (
    <Alert
      mt={4}
      w="98%"
      variant="left-accent"
      status="info"
      css={{
        '> *:first-of-type': {
          marginTop: 0,
          marginLeft: 8,
        },
      }}
      {...props}
    />
  );
};
const AnchorHeading: React.FC<HeadingProps> = ({
  children,
  id,
  ...rest
}: PropsWithChildren<HeadingProps & { id?: string }>) => {
  const { colorMode } = useColorMode();
  const color = {
    light: 'hsl(208, 99%, 44%)',
    dark: 'hsl(208, 95%, 68%)',
  };
  return (
    <Heading
      {...rest}
      css={{
        scrollMarginTop: '100px',
        scrollSnapMargin: '100px', // Safari
        '&[id]:hover a': { opacity: 1, color: 'primary' },
      }}
      id={id}
    >
      {children}
      {id && (
        <Link
          aria-label="anchor"
          ml="0.375rem"
          color={color[colorMode]}
          css={{ opacity: 0 }}
          href={`#${id}`}
          _hover={{ textDecoration: 'none' }}
        >
          #
        </Link>
      )}
    </Heading>
  );
};

const Hr = () => {
  const { colorMode } = useColorMode();
  const borderColor = {
    light: 'gray.200',
    dark: 'gray.600',
  };

  return <Divider borderColor={borderColor[colorMode]} my={4} w="100%" />;
};

export const MDXComponents = {
  h1: (props) => <Heading as="h1" size="xl" my={4} {...props} />,
  h2: (props: PropsWithChildren<{ id?: string }>): React.ReactElement => <AnchorHeading as="h2" size="lg" {...props} />,
  h3: (props: PropsWithChildren<{ id?: string }>): React.ReactElement => <AnchorHeading as="h3" size="md" {...props} />,
  inlineCode: (props) => <Code colorScheme="yellow" fontSize="0.84em" {...props} />,
  kbd: Kbd,
  br: (props) => <Box as="br" height="24px" {...props} />,
  hr: Hr,
  table: Table,
  th: THead,
  td: TData,
  a: CustomLink,
  p: (props) => <Text as="p" mt={2} lineHeight="tall" {...props} />,
  iframe: (props) => <Box as="iframe" my={4} {...props} />,
  ul: (props) => <Box as="ul" pt={2} pl={4} ml={2} {...props} />,
  ol: (props) => <Box as="ol" pt={2} pl={4} ml={2} {...props} />,
  li: (props) => <Box as="li" pb={1} {...props} />,
  img: (props) => <Image my={8} mx="auto" {...props} />,
  blockquote: Quote,
};
export default MDXComponents;
