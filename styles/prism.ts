import { mode } from '@chakra-ui/theme-tools';

export const prismTheme = (props) => ({
  code: {
    whiteSpace: 'pre',
  },
  "code[class*='language-'],pre[class*='language-']": {
    color: mode('gray.800', 'gray.50')(props),
    background: 'none',
    fontFamily: 'mono',
    fontSize: '2',
    textAlign: 'left',
    wordSpacing: 'normal',
    wordBreak: 'normal',
    wordWrap: 'normal',
    lineHeight: 2,
    MozTabSize: 4,
    OTabSize: 4,
    tabSize: 4,
    WebkitHyphens: 'none',
    MozHyphens: 'none',
    MsHyphens: 'none',
    hyphens: 'none',
    width: '100%',
  },
  "pre[class*='language-']": {
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 4,
    paddingRight: 4,
    my: 6,
    mx: 0,
    overflow: 'auto',
    minWidth: '100%',
    fontSize: '0.9rem',
    whiteSpace: 'nowrap',
  },
  ":not(pre) > code[class*='language-'], pre[class*='language-']": {
    background: mode('gray.100', 'gray.800')(props),
    border: mode('1px solid gray.200', '1px solid gray.700')(props),
    borderRadius: 'sm',
  },
  ":not(pre) > code[class*='language-']": {
    background: mode('gray.100', '#011627')(props),
    padding: '0.1em',
    borderRadius: 'sm',
    whiteSpace: 'normal',
  },
  '.token.comment,.token.prolog,.token.doctype,.token.cdata,.token.selector': {
    fontStyle: 'italic',
  },
  '.token.comment,.token.prolog,.token.doctype,.token.cdata': {
    color: mode('gray.400', 'rgb(128, 147, 147)')(props),
  },
  '.token.punctuation': {
    color: mode('#999', 'rgb(199, 146, 234)')(props),
  },
  '.token.namespace': {
    color: mode('#999', 'rgb(178, 204, 214)')(props),
  },
  '.token.property,.token.tag,.token.boolean,.token.number,.token.constant,.token.symbol,.token.deleted': {
    color: mode('#905', 'rgb(247, 140, 108)')(props),
  },
  '.token.selector,.token.attr-name,.token.string,.token.char,.token.builtin,.token.inserted': {
    color: mode('#690', 'rgb(173, 219, 103)')(props),
  },
  '.token.operator,.token.entity,.token.url,.language-css .token.string,.style .token.string': {
    color: mode('#9a6e3a', 'rgb(230, 219, 103)')(props),
  },
  '.token.atrule,.token.attr-value,.token.keyword': {
    color: mode('#07a', '#ffa7c4;')(props),
  },
  '.token.function': {
    color: mode('#dd4a68', 'rgb(130, 170, 255)')(props),
  },
  '.token.class-name, .token.maybe-class-name': {
    color: mode('#dd4a68', 'rgb(255, 203, 139)')(props),
  },
  '.token.regex,.token.important,.token.variable': {
    color: mode('#e90', 'rgb(214, 222, 235)')(props),
  },
  '.token.important,.token.bold': {
    fontWeight: 'bold',
  },
  '.token.italic': {
    fontStyle: 'italic',
  },
  '.token.entity': {
    cursor: 'help',
  },

  '.mdx-marker': {
    display: 'block',
    marginLeft: -4,
    marginRight: -4,
    paddingLeft: 4,
    paddingRight: 4,
    backgroundColor: mode('gray.200', 'gray.700')(props),
    boxShadow: 'inset 3px 0px 0 0px blue.600',
    minWidth: 'fit-content',
  },

  '.remark-code-title': {
    py: 2,
    px: 4,
    fontFamily: 'mono',
    background: mode('gray.200', 'gray.700')(props),
    color: mode('gray.800', 'gray.100')(props),
    border: mode('1px solid gray.200', '1px solid gray.700')(props),
    borderTopLeftRadius: 'sm',
    borderTopRightRadius: 'sm',
    fontSize: '0.8rem',
    fontWeight: '600',
    mb: 0,
    mt: 6,
    width: '100%',
  },
  '.remark-code-title + pre ': {
    borderTopLeftRadius: '0',
    borderTopRightRadius: '0',
    marginTop: 0,
  },
});
