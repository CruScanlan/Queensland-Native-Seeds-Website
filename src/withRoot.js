import React from 'react';
import {MuiThemeProvider} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import JssProvider from 'react-jss/lib/JssProvider';
import {ParallaxProvider} from 'react-scroll-parallax';
import getPageContext from './getPageContext';

function withRoot(Component) {
    class WithRoot extends React.Component {
        constructor(props) {
            super(props);
            this.muiPageContext = getPageContext();
        }

        componentDidMount() {
            // Remove the server-side injected CSS.
            const jssStyles = document.querySelector('#jss-server-side');
            if (jssStyles && jssStyles.parentNode) {
                jssStyles.parentNode.removeChild(jssStyles);
            }
        }

        render() {
            return (
                <JssProvider generateClassName={this.muiPageContext.generateClassName}>
                    {/* MuiThemeProvider makes the theme available down the React
              tree thanks to React context. */}
                    <MuiThemeProvider
                        theme={this.muiPageContext.theme}
                        sheetsManager={this.muiPageContext.sheetsManager}
                    >
                        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                        <CssBaseline/>
                        <ParallaxProvider>
                            <Component {...this.props} />
                        </ParallaxProvider>
                    </MuiThemeProvider>
                </JssProvider>
            );
        }
    }

    return WithRoot;
}

export default withRoot;
