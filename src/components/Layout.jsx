import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

import "assets/scss/material-kit-react.css?v=1.3.0";
import Header from './Header/Header'
import HeaderLinks from './Header/HeaderLinks'
import Footer from './Footer/Footer'

const Layout = ({ children }) => (
    <StaticQuery
        query={graphql`
            query {
                site {
                    siteMetadata {
                        title
                    }
                },
                logoImage: file(relativePath: { eq: "logo.png" }) {
                    childImageSharp {
                        fluid(maxWidth: 250) {
                            ...GatsbyImageSharpFluid
                        }
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
                    brand={data.logoImage.childImageSharp.fluid}
                    fixed
                    rightLinks={<HeaderLinks />}
                    changeColorOnScroll={{
                        height: 200,
                        color: "dark"
                    }}/>
                <div>
                    {children}
                </div>
                <Footer />
            </>
        )}
    />
);

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Layout;