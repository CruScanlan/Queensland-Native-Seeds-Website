import React from "react"
import { Helmet } from "react-helmet"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"

const SEO = ({ title, description, image, pathname, article, breadCrumbs, extraSchema=[] }) => (
  <StaticQuery
    query={query}
    render={({
      site: {
        siteMetadata: {
          homeTitle,
          siteUrl
        },
      },
    }) => {

      if(pathname === "/") title = homeTitle;
      else title = `${title} - Queensland Native Seeds`;

      let seo = {
        title: title,
        description: description,
        image: image,
        url: `${siteUrl}${pathname || "/"}`,
        schema: {
            "@context": "https://schema.org",
            "@graph": [
                {
                    "@context": "https://schema.org",
                    "@type": "BreadcrumbList",
                    "itemListElement": [breadCrumbs.map((breadCrumb, index) => {
                        return {
                        "@type": "ListItem",
                        "position": index+1,
                        "name": breadCrumb.name,
                        "item": `https://qldnativeseeds.com.au/${breadCrumb.url}`
                        }
                    })]
                },
                ...extraSchema
            ]
        }
      }

      return (
        <>
          <Helmet title={seo.title} >
            {seo.description && <meta name="description" content={seo.description} />}
            <meta name="image" content={seo.image} />
            {seo.url && <meta property="og:url" content={seo.url} />}
            <meta property="og:type" content={seo.article ? 'article' : 'website'} />
            {seo.title && <meta property="og:title" content={title} />}
            {seo.description && (
              <meta property="og:description" content={seo.description} />
            )}
            {seo.image && <meta property="og:image" content={seo.image.startsWith('/static') ? `https://qldnativeseeds.com.au${seo.image}` : seo.image} />}
            <meta name="twitter:card" content="summary_large_image" />
            {seo.title && <meta name="twitter:title" content={seo.title} />}
            {seo.description && (
              <meta name="twitter:description" content={seo.description} />
            )}
            <script type="application/ld+json">
              {JSON.stringify(seo.schema)}
            </script>
          </Helmet>
        </>
      )
    }}
  />
)

export default SEO

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  pathname: PropTypes.string,
  article: PropTypes.bool,
  extraSchema: PropTypes.array
}

SEO.defaultProps = {
  title: null,
  description: null,
  image: null,
  pathname: null,
  article: false,
}

const query = graphql`
  query SEO {
    site {
      siteMetadata {
        homeTitle
        siteUrl
      }
    }
  }
`