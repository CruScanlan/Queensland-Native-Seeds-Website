/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
// nodejs library that concatenates classes
import classNames from "classnames";
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import { withStyles } from '@material-ui/core/styles';
import Layout from 'components/Layout.jsx';
import SEO from 'components/SEO/SEO.jsx';

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import ParallaxHeader from "components/Parallax/ParallaxHeader.jsx";
// sections for this page
import generalStyle from "assets/views/generalStyle.jsx";
import landingPageStyle from "assets/views/landingPage.jsx";
import articleIndexStyle from "assets/views/articleIndexStyle.jsx";
import withRoot from "withRoot";
import { graphql, Link } from 'gatsby';

const styles = {
    ...landingPageStyle,
    ...generalStyle,
    ...articleIndexStyle
}

class ArticlePage extends React.Component {
    constructor(props) {
        super(props)
    }

    renderArticles(articles, classes, data) {
        return articles.sort((a, b) => {
            return new Date(a.node.createdAt) - new Date(b.node.createdAt);
        }).map(({node}, index) => {
            if(index % 2 === 1) { //every second occurance render a right side article
                return (
                    <>
                        <GridContainer justify="center" className={classes.article} key={node.slug}>
                            <GridItem xs={12} sm={7} md={7}>
                                <Link to={`/articles/${node.slug}`} >
                                    <h3 className={classes.articleTitle}>{node.title}</h3>
                                    {this.renderArticleSubTitle(node.subTitle,classes)}
                                </Link>
                                <p className={classes.articleSnippet}>{node.description.description} <Link to={`/articles/${node.slug}`} >Read More</Link></p>
                            </GridItem>
                            <GridItem xs={12} sm={5} md={5} className={classes.rightPicture}>
                                <div className={classes.inLineImageContainer}>
                                    {this.renderArticleImage(node.headerImage, node.slug, classes, data)}
                                </div>
                            </GridItem>
                        </GridContainer>
                        {index !== articles.length -1 ? <hr/> : <div />}
                    </>
                )
            }

            return (
                <>
                    <GridContainer justify="center" className={classes.article} key={node.slug}>
                        <GridItem xs={12} sm={5} md={5}>
                            <div className={classes.inLineImageContainer}>
                                {this.renderArticleImage(node.headerImage, node.slug, classes, data)}
                            </div>
                        </GridItem>
                        <GridItem xs={12} sm={7} md={7}>
                            <Link to={`/articles/${node.slug}`} >
                                <h3 className={classes.articleTitle}>{node.title}</h3>
                                {this.renderArticleSubTitle(node.subTitle, classes)}
                            </Link>
                            <p className={classes.articleSnippet}>{node.description.description} <Link to={`/articles/${node.slug}`} >Read More</Link></p>
                        </GridItem>
                    </GridContainer>
                    {index !== articles.length -1 ? <hr/> : <div />}
                </>
            )
        })
    }

    renderArticleImage(headerImage, slug, classes, data) {
        if(headerImage) {
            return (
                <>
                    <Link to={`/articles/${slug}`} >
                        <Img fluid={headerImage.fluid} className={classes.inLineImage} />
                        <Img fluid={headerImage.fluid} className={classes.inLineImageShadow} />
                    </Link>
                </>
            )
        }
        return (
            <>
                <Link to={`/articles/${slug}`} >
                    <Img fluid={data.backgroundImage.childImageSharp.fluid} className={classes.inLineImage} />
                    <Img fluid={data.backgroundImage.childImageSharp.fluid} className={classes.inLineImageShadow} />
                </Link>
            </>
        )
    }

    renderArticleSubTitle(subTitle, classes) {
        if(subTitle) return <h4 className={classes.articleSubTitle}>{subTitle}</h4>
        return <></>
    }

    render() {
        const { classes, data } = this.props;

        return (
            <>
                <SEO 
                    pathname={`/articles`}
                    title={'Articles'}
                    image={data.backgroundImage.childImageSharp.fluid.src}/>
                <Layout>
                    <ParallaxHeader filter medium image={data.backgroundImage.childImageSharp.fluid} />
                    <div className={classNames(classes.main, classes.mainRaised)}>
                        <div className={classes.container}>
                            <div className={classes.section}>
                                <GridContainer justify="center">
                                    <GridItem xs={12} sm={12} md={12}>
                                        <h2 className={classes.title}>Articles</h2>
                                    </GridItem>
                                </GridContainer>
                                <div className={classes.articlesListContainer}>
                                    {this.renderArticles(data.allContentfulArticles.edges, classes, data)}
                                </div>
                            </div>
                        </div>
                    </div>
                </Layout>
            </>
        );
    }
}

ArticlePage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export const query = graphql`
    query {
        backgroundImage: file(relativePath: { eq: "bg25.jpg" }) {
            childImageSharp {
                fluid(maxWidth: 1920, quality: 95) {
                    ...GatsbyImageSharpFluid_withWebp
                }
            }
        },
        allContentfulArticles {
            edges {
              node {
                title,
                slug,
                subTitle,
                headerImage {
                    fluid(quality: 50, maxWidth: 1000) {
                        ...GatsbyContentfulFluid_withWebp
                    }
                },
                description {
                    description
                },
                childContentfulArticlesContentRichTextNode {
                  childContentfulRichText {
                    html
                  }
                },
                createdAt
              }
            }
        }
    }
`

export default withRoot(withStyles(styles)(ArticlePage));