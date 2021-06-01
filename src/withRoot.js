import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './theme';

function withRoot(Component) {
    class WithRoot extends React.Component {
        constructor(props) {
            super(props);
            this.theme = theme;
        }

        render() {
            return (
              <ThemeProvider
                    theme={this.theme}
                >
                    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                    <CssBaseline/>
                    <Component {...this.props} />
                </ThemeProvider>
            );
        }
    }

    return WithRoot;
}

export default withRoot;
