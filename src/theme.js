import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

// A theme with custom primary and secondary color.
// It's optional.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#495057'
    },
    secondary: {
      light: green[300],
      main: green[500],
      dark: green[700],
    },
  },
});

export default theme;