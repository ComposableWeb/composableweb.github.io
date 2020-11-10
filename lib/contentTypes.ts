import { NextPage } from 'next';

import * as zod from 'zod';
import { IReadTimeResults } from './mdx';
import { MarkdownFileProps } from './propTypes';

export type PostFrontmatter = {
  title: string;
  createdAt: string;
  publishedAt: string;
  draft: boolean;
  summary?: string;
  tags?: string[];
  wordCount: number;
  readingTime: IReadTimeResults;
};

export type BlogFrontmatter = PostFrontmatter;

export type CodeRecipeFrontmatter = PostFrontmatter;
export type PageFrontmatter = PostFrontmatter;

export type PageData = {
  title: string;
  metaTitle: string;
};

export type NextPageWithDataProps<T = PageData> = {
  preview: boolean;
  file: MarkdownFileProps<T>;
};
export type NextPageWithData = NextPage<NextPageWithDataProps>;

export const ResumeSchema = zod.object({
  basics: zod.object({
    name: zod.string(),
    label: zod.string(),
    picture: zod.string(),
    email: zod.string(),
    phone: zod.string(),
    website: zod.string(),
    summary: zod.string(),
    location: zod.object({
      address: zod.string(),
      postalCode: zod.string(),
      city: zod.string(),
      countryCode: zod.string(),
      region: zod.string(),
    }),
    profiles: zod
      .object({
        network: zod.string(),
        username: zod.string(),
        url: zod.string().url(),
      })
      .array(),
  }),
  work: zod
    .object({
      company: zod.string(),
      position: zod.string(),
      website: zod.string(),
      startDate: zod.string(),
      endDate: zod.string(),
      summary: zod.string(),
      highlights: zod.string().array(),
    })
    .array(),
  volunteer: zod
    .object({
      organization: zod.string(),
      position: zod.string(),
      website: zod.string().url(),
      startDate: zod.string(),
      endDate: zod.string(),
      summary: zod.string(),
      highlights: zod.string().array(),
    })
    .array(),
  education: zod
    .object({
      institution: zod.string(),
      area: zod.string(),
      studyType: zod.string(),
      startDate: zod.string(),
      endDate: zod.string(),
      gpa: zod.string(),
      courses: zod.string().array(),
    })
    .array(),
  awards: zod
    .object({
      title: zod.string(),
      date: zod.string(),
      awarder: zod.string(),
      summary: zod.string(),
    })
    .array(),
  publications: zod
    .object({
      name: zod.string(),
      publisher: zod.string(),
      releaseDate: zod.string(),
      website: zod.string().url(),
      summary: zod.string(),
    })
    .array(),
  skills: zod
    .object({
      name: zod.string(),
      level: zod.string(),
      keywords: zod.string().array(),
    })
    .array(),
  languages: zod
    .object({
      language: zod.string(),
      fluency: zod.string(),
    })
    .array(),
  interests: zod
    .object({
      name: zod.string(),
      keywords: zod.string().array(),
    })
    .array(),
  references: zod
    .object({
      name: zod.string(),
      reference: zod.string(),
    })
    .array(),
});
export type ResumeData = zod.infer<typeof ResumeSchema>;
