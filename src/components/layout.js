import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

import Header from './Header/Header'
import HeaderLinks from './Header/HeaderLinks'
import withRoot from '../withRoot'
import Parallax from './Parallax/Parallax'
import '../assets/material-kit-react.css?v=1.2.0'

const Layout = ({ children }) => (
    <StaticQuery
        query={graphql`
            query SiteTitleQuery {
                site {
                    siteMetadata {
                        title
                    }
                }
            }
    `}
        render={data => (
            <>
                <Helmet
                    title={data.site.siteMetadata.title}
                    meta={[
                        { name: 'description', content: 'Sample' },
                        { name: 'keywords', content: 'sample, something' },
                    ]}
                >
                    <html lang="en" />
                </Helmet>
                <Header
                    color="transparent"
                    brand="Material Kit React"
                    fixed
                    rightLinks={<HeaderLinks />}
                    changeColorOnScroll={{
                        height: 100,
                        color: "white"
                    }}/>
                <Parallax image={require("../../src/images/banner1.jpg")}>
                    <div>
                        Test
                    </div>
                </Parallax>
                <div
                    style={{
                        margin: '0 auto',
                        maxWidth: 960,
                        padding: '0px 1.0875rem 1.45rem',
                        paddingTop: 0,
                    }}
                >
                    {children}
                </div>
            </>
        )}
    />
);

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default withRoot(Layout);