import { createTheme } from '@mui/material/styles';
import { Roboto } from 'next/font/google';

// eslint-disable-next-line new-cap
export const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
});

const theme = createTheme({
  components: {
    MuiLink: {
      defaultProps: {
        underline: 'hover',
        color: '#3f51b5',
      },
    },
  },
});

export default theme;
