import { createTheme, adaptV4Theme } from '@mui/material/styles';

const theme = createTheme(
  adaptV4Theme({
    typography: {
      useNextVariants: true,
    },
  })
);

export default theme;
