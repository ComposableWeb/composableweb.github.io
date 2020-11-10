import { useGithubJsonForm } from 'react-tinacms-github';
import { InlineImage, InlineText, InlineTextarea } from 'react-tinacms-inline';

import { Avatar, Box, Divider, Flex, Grid, Link, Stack } from '@chakra-ui/core';
import { FiPhone, FiMail, FiLink, FiLinkedin, FiTwitter, FiGithub } from 'react-icons/fi';

import { ResumeData } from 'lib/contentTypes';
import { GitFile } from 'react-tinacms-github/dist/src/form/useGitFileSha';
import OpenAuthoringInlineForm from '~components/OpenAuthoringInlineForm';
import ArticleLayout from '~components/ArticleLayout';
import Heading from '~components/Heading';

import { ResumePageProps } from '../../pages/resume/[lang]';

const socialIcons = {
  Twitter: FiTwitter,
  GitHub: FiGithub,
  LinkedIn: FiLinkedin,
};
const ResumeEditable: React.FC<ResumePageProps> = ({ file }) => {
  const formOptions = {
    label: 'Resume',
    fields: [
      {
        label: 'Basics',
        name: 'basics',
        component: 'group',
        fields: [
          { name: 'name', component: 'text', label: 'Name' },
          { name: 'label', component: 'text', label: 'Job Title' },
          { name: 'email', component: 'text', label: 'Email' },
          { name: 'phone', component: 'text', label: 'Phone' },
          { name: 'website', component: 'text', label: 'Website' },
          { name: 'summary', component: 'textarea', label: 'Summary' },
          {
            name: 'picture',
            component: 'image',
            label: 'Photo',
            uploadDir: () => {
              return '/static/images/';
            },

            parse: (filename) => `/static/images/${filename}`,
            previewSrc: (formValues: ResumeData) => `${formValues.basics.picture}`,
          },
        ],
      },
    ],
  };
  const [data, form] = useGithubJsonForm(file as GitFile<ResumeData>, formOptions);

  return (
    <OpenAuthoringInlineForm form={form}>
      <ArticleLayout>
        <Grid
          backgroundColor="white"
          templateColumns={{ base: '1fr', lg: '2.5fr 1fr' }}
          maxWidth="1100px"
          mx="auto"
          boxShadow="lg"
        >
          <Box p={10}>
            <Heading as="h2" size="lg">
              Profile
            </Heading>

            <InlineTextarea name="basics.summary" />
          </Box>
          <Box backgroundColor="gray.300">
            <Stack backgroundColor="gray.500" textAlign="center" p={10}>
              <InlineImage
                name="basics.picture"
                parse={(filename) => (filename ? `/static/images/${filename}` : null)}
                uploadDir={() => '/static/images/'}
                previewSrc={(_src, _path, formValues: ResumeData): string => formValues.basics.picture}
              >
                {(props) => (
                  <Avatar
                    size="xl"
                    w={['48px', '48px', '48px', '130px']}
                    h={['48px', '48px', '48px', '130px']}
                    name="Andreas Adam"
                    mx="auto"
                    src={props?.src || data.basics.picture}
                  />
                )}
              </InlineImage>
              <Heading as="h2" size="xl">
                <InlineText name="basics.name" />
              </Heading>
              <Heading as="h3" size="md">
                <InlineText name="basics.label" />
              </Heading>
            </Stack>

            <Stack px={5} py={5} gridGap={1}>
              <Flex fontSize="md" alignItems="center">
                <Box as={FiMail} mr={2} w="16px" h="16px" color="cyan.900" />
                <Link href={`mailto:${data.basics.email}`}>
                  <InlineText name="basics.email" />
                </Link>
              </Flex>
              <Flex fontSize="md" alignItems="center">
                <Box as={FiPhone} mr={2} w="16px" h="16px" color="cyan.900" />
                <Link href={`tel:${data.basics.phone}`}>
                  <InlineText name="basics.phone" />
                </Link>
              </Flex>
              <Flex fontSize="md" alignItems="center">
                <Box as={FiLink} mr={2} w="16px" h="16px" color="cyan.900" />
                <Link href={data.basics.website}>
                  <InlineText name="basics.website" />
                </Link>
              </Flex>
              <Divider />
              {data.basics.profiles.length &&
                data.basics.profiles.map((profile) => (
                  <Flex key={profile.url} fontSize="md" alignItems="center">
                    <Box as={socialIcons[profile.network]} mr={2} w="16px" h="16px" color="cyan.900" />
                    <Link href={profile.url}>{profile.username}</Link>
                  </Flex>
                ))}
            </Stack>
          </Box>
        </Grid>
      </ArticleLayout>
    </OpenAuthoringInlineForm>
  );
};
export default ResumeEditable;
