import React from 'react';
import PropTypes from 'prop-types';

import "assets/scss/material-kit-react.css?v=1.3.0";
import "vendorCss/googlefont.css";
import Header from './Header/Header';
import HeaderLinks from './Header/HeaderLinks';
import Footer from './Footer/Footer';

import logo from 'assets/img/logosvg.svg';

class Layout extends React.Component {
    render() {
        const {whiteHeader, children} = this.props;
        return (
            <>
                <Header
                    color={(whiteHeader ? 'white' : 'transparent')}
                    brand={logo}
                    fixed
                    rightLinks={<HeaderLinks />}
                    changeColorOnScroll={{
                        height: 200,
                        color: "white"
                    }}/>
                <div>
                    {children}
                </div>
                <Footer />
            </>
        )
    }
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Layout;