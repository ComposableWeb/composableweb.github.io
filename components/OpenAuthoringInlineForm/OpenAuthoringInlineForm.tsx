import React from 'react';
import { InlineForm, InlineFormProps } from 'react-tinacms-inline';
import { useGithubToolbarPlugins } from 'react-tinacms-github';
import { usePlugin } from 'tinacms';

export const OpenAuthoringInlineForm: React.FC<InlineFormProps> = ({ form, children }: InlineFormProps) => {
  // Toolbar Plugins
  useGithubToolbarPlugins();
  usePlugin(form);
  return <InlineForm form={form}>{children}</InlineForm>;
};

export default OpenAuthoringInlineForm;
