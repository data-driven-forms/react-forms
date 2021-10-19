import { createTheme } from '@mui/material/styles';

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
