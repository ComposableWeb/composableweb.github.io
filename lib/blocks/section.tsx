import get from 'lodash.get';

/*
 **  Block template definition for the section block
 **/

export type SectionBlockData = {
  content: string;
  heading: string;
  subheading: string;
  image: string;
  link: string;
  tags: string[];
};

export const SectionBlock = {
  label: 'Section',
  key: 'section',
  defaultItem: {
    content: '',
    heading: '',
    image: '',
    subheading: '',
    link: '',
    tags: [],
  },
  fields: [
    { name: 'content', label: 'Content', component: 'markdown' },
    { name: 'heading', label: 'Heading', component: 'text' },
    { name: 'subheading', label: 'Sub-Heading', component: 'text' },
    {
      name: 'image',
      label: 'Image',
      component: 'image',
      uploadDir: (): string => {
        return '/static/images/';
      },

      parse: (filename: string): string => `/static/images/${filename}`,
      previewSrc: (formValues, fieldProps): string => {
        const imageNode = get(formValues, fieldProps.input.name);
        return imageNode || '';
      },
    },
    { name: 'link', label: 'Link', component: 'text' },
    { name: 'tags', label: 'Tags', component: 'tags' },
  ],
};
