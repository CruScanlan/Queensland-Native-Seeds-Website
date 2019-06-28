/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
// nodejs library that concatenates classes
import classNames from "classnames";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ArticlesRichText from '../articlesRichTextParser.jsx';
import articleRichTextStyle from 'assets/articleRichTextStyle.jsx';
import Layout from 'components/Layout.jsx';

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Parallax from "components/Parallax/ParallaxHeader.jsx";

import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Button from "components/CustomButtons/Button.jsx";
// sections for this page
import generalStyle from "assets/views/generalStyle.jsx";
import landingPageStyle from "assets/views/landingPage.jsx";
import withRoot from "withRoot";
import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';

const styles = {
    ...generalStyle,
    ...landingPageStyle,
    ...articleRichTextStyle
}

class ArticlePage extends React.Component {
    constructor(props) {
        super(props)
    }

    renderOtherArticles(articles, data, classes) {
        return (
            <div className={classes.pageContainer} style={{marginTop: '80px'}}>
                <div style={{textAlign: "center", marginBottom: '40px'}}>
                    <h2 className={classes.title} style={{color: '#3C4858'}}>Other Articles</h2>
                </div>
                <GridContainer justify="center">
                    {
                        articles.map(article => {
                            return (
                                <GridItem xs={12} sm={12} md={4}>
                                    <Card>
                                        <CardHeader style={{padding: 0}}>
                                            <div className={classNames(classes.inLineImageContainer, classes.image)}>
                                                <Link to={`/articles/${article.slug}`} >
                                                    <Img fluid={{...(article.headerImage ? article.headerImage.fluid : data.backgroundImage.childImageSharp.fluid), aspectRatio: 4/3}} className={classes.inLineImage} />
                                                    <Img fluid={{...(article.headerImage ? article.headerImage.fluid : data.backgroundImage.childImageSharp.fluid), aspectRatio: 4/3}} className={classes.inLineImageShadow} />
                                                </Link>
                                            </div>
                                        </CardHeader>
                                        <CardBody>
                                            <div style={{textAlign: "center"}}>
                                                <Link to={`/articles/${article.slug}`} >
                                                    <h3 className={classes.title} style={{color: '#3C4858'}}>{article.title}</h3>
                                                    <h4 className={classes.articleSubTitle}>{article.subTitle}</h4>
                                                </Link>
                                                <p className={classes.articleSnippet}>{article.description.description} <Link to={`/articles/${article.slug}`} >Read More</Link></p>
                                            </div>
                                        </CardBody>
                                    </Card>
                                </GridItem>
                            )
                        })
                    }
                </GridContainer>
                <div className={classes.centerText}>
                    <Link to="/articles">
                        <Button color="primary" size="lg" round style={{marginTop: "40px"}}>See All Articles</Button>
                    </Link>
                </div>
            </div>
        )        
    }

    render() {
        const { classes, data } = this.props;
        const articleContent = this.getArticleContent();

        return (
            <Layout>
                <Parallax filter image={data.article.headerImage ? data.article.headerImage.fluid : data.backgroundImage.childImageSharp.fluid}>
                    <div className={classes.container}>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={12} style={{textAlign: "center"}}>
                                <h1 className={classes.title}>{data.article.title}</h1>
                                <h3 className={classes.title} style={{marginTop: "5px", fontWeight: 400, width: '100%'}}>{data.article.subTitle}</h3>
                            </GridItem>
                        </GridContainer>
                    </div>
                </Parallax>
                <div className={classNames(classes.main, classes.mainRaised)}>
                    <div className={classes.pageContainer}>
                        <ArticlesRichText richText={articleContent} />
                    </div>
                </div>
               {data.article.otherArticles ? this.renderOtherArticles(data.article.otherArticles, data, classes) : <div />}
            </Layout>
        );
    }

    getArticleContent() {
        return JSON.parse(this.props.data.article.content.internal.content)
    }

}

ArticlePage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export const query = graphql`
    query ArticleQuery($slug: String!) {
        backgroundImage: file(relativePath: { eq: "bg10.jpg" }) {
            childImageSharp {
                fluid(maxWidth: 1920, quality: 95) {
                    ...GatsbyImageSharpFluid_withWebp
                }
            }
        },
        article: contentfulArticles(slug: {eq: $slug } ) {
            title,
            slug,
            subTitle,
            headerImage {
                fluid(quality: 80, maxWidth: 1920) {
                    ...GatsbyContentfulFluid_withWebp
                }
            },
            description {
                description
            },
            content {
                internal {
                    content
                }
            },
            otherArticles {
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
                }
            }
        }
    }
`

export default withRoot(withStyles(styles)(ArticlePage));