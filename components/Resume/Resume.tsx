import { Avatar, Box, Divider, Flex, Grid, Link, Stack, Text, useColorModeValue } from '@chakra-ui/core';
import { FiPhone, FiMail, FiLink, FiLinkedin, FiTwitter, FiGithub } from 'react-icons/fi';

import ArticleLayout from '~components/ArticleLayout';
import Heading from '~components/Heading';

import { ResumePageProps } from '../../pages/resume/[lang]';

const socialIcons = {
  Twitter: FiTwitter,
  GitHub: FiGithub,
  LinkedIn: FiLinkedin,
};
const Resume: React.FC<ResumePageProps> = ({ file: { data } }) => {
  const resumeMainBg = useColorModeValue('white', 'black');
  const resumeSideBg = useColorModeValue('gray.300', 'gray.500');
  const resumeSideHeadBg = useColorModeValue('gray.500', 'gray.700');
  const iconColor = useColorModeValue('cyan.900', 'teal.800');
  return (
    <ArticleLayout>
      <Grid
        backgroundColor={resumeMainBg}
        templateColumns={{ base: '1fr', lg: '2.5fr 1fr' }}
        maxWidth="1100px"
        mx="auto"
        boxShadow="lg"
      >
        <Box p={10}>
          <Heading as="h2" size="lg">
            Profile
          </Heading>

          <Text as="p">{data.basics.summary}</Text>
        </Box>
        <Box backgroundColor={resumeSideBg}>
          <Stack backgroundColor={resumeSideHeadBg} textAlign="center" p={10}>
            {data.basics.picture && (
              <Avatar
                size="xl"
                w={['48px', '48px', '48px', '130px']}
                h={['48px', '48px', '48px', '130px']}
                name="Andreas Adam"
                mx="auto"
                src={data.basics.picture}
              />
            )}

            <Heading as="h2" size="xl">
              {data.basics.name}
            </Heading>
            <Heading as="h3" size="md">
              {data.basics.label}
            </Heading>
          </Stack>

          <Stack px={5} py={5} gridGap={1}>
            <Flex fontSize="md" alignItems="center">
              <Box as={FiMail} mr={2} w="16px" h="16px" color={iconColor} />
              <Link href={`mailto:${data.basics.email}`}>{data.basics.email}</Link>
            </Flex>
            <Flex fontSize="md" alignItems="center">
              <Box as={FiPhone} mr={2} w="16px" h="16px" color={iconColor} />
              <Link href={`tel:${data.basics.phone}`}>{data.basics.phone}</Link>
            </Flex>
            <Flex fontSize="md" alignItems="center">
              <Box as={FiLink} mr={2} w="16px" h="16px" color={iconColor} />
              <Link href={data.basics.website}>{data.basics.website}</Link>
            </Flex>
            <Divider />
            {data.basics.profiles.length &&
              data.basics.profiles.map((profile) => (
                <Flex key={profile.url} fontSize="md" alignItems="center">
                  <Box as={socialIcons[profile.network]} mr={2} w="16px" h="16px" color={iconColor} />
                  <Link href={profile.url}>{profile.username}</Link>
                </Flex>
              ))}
          </Stack>
        </Box>
      </Grid>
    </ArticleLayout>
  );
};
export default Resume;
