// theme.js
import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    primary: {
      500: '#6B46C1', // this is a common shade of purple
    },
    secondary: {
      500: '#D6BCFA', // this is a lighter shade of purple
    },
  },
});

export default theme;
