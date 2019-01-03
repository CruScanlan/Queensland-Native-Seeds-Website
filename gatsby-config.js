module.exports = {
    siteMetadata: {
        title: 'Queensland Native Seeds',
        siteUrl: `https://qldnativeseeds.com.au`,
    },
    plugins: [
        'gatsby-plugin-resolve-src',
        {
            resolve: `gatsby-source-contentful`,
            options: {
              spaceId: `lm6r1erd61i7`,
              accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
              host: process.env.CONTENTFUL_HOST_URL
            },
        },
        'gatsby-plugin-react-helmet',
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/src/assets/img`,
            },
        },
        'gatsby-transformer-sharp',
        'gatsby-plugin-sharp',
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: 'gatsby-starter-default',
                short_name: 'starter',
                start_url: '/',
                background_color: '#663399',
                theme_color: '#663399',
                display: 'minimal-ui',
                icon: 'src/assets/img/gatsby-icon.png', // This path is relative to the root of the site.
            },
        },
        `gatsby-plugin-netlify`,
        `gatsby-plugin-sitemap`,
        {
            resolve: 'gatsby-plugin-robots-txt',
            options: {
                host: 'https://qldnativeseeds.com.au',
                sitemap: 'https://qldnativeseeds.com.au/sitemap.xml',
                policy: [{ userAgent: '*', allow: '/' }]
            }
        }
    ]
};
