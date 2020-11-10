import { render } from '@testing-library/react';
import { ChakraProvider as ThemeProvider } from '@chakra-ui/core';

import theme from '../styles';

const ChakraRenderer: React.FC = ({ children }: React.PropsWithChildren<Record<string, any>>) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

const customRender = (ui, options = {}) =>
  render(ui, {
    wrapper: ChakraRenderer,
    ...options,
  });

export * from '@testing-library/react';
export { customRender as render };
