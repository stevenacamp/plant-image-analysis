import { createMuiTheme } from '@material-ui/core';
import amber from '@material-ui/core/colors/amber';
import teal from '@material-ui/core/colors/teal';

export const theme = createMuiTheme({
    palette: {
        primary: teal,
        secondary: amber
    },
    typography: {
        useNextVariants: true,
    },
});