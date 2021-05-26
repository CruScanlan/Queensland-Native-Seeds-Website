require("dotenv").config({
    path: '.env',
});

module.exports = {
    siteMetadata: {
        siteUrl: `https://qldnativeseeds.com.au`,
        homeTitle: "Queensland Native Seeds - Australian Native Seed Supplier"
    },
    flags: {
        PRESERVE_WEBPACK_CACHE: true,
        PRESERVE_FILE_DOWNLOAD_CACHE: false,
    },
    plugins: [
        `gatsby-plugin-netlify-cache`,
        `gatsby-plugin-netlify`,
        'gatsby-plugin-resolve-src',
        {
            resolve: `gatsby-source-contentful`,
            options: {
              spaceId: 'lm6r1erd61i7',
              accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
              host: process.env.CONTENTFUL_HOST_URL
            }
        },
        //`gatsby-contentful-image-domain-change`,
        `gatsby-source-avh-distribution-map`,
        'gatsby-plugin-react-helmet',
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `imageAssets`,
                path: `${__dirname}/src/assets/img`,
            },
        },
        'gatsby-transformer-sharp',
        'gatsby-plugin-sharp',
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: 'Queensland Native Seeds',
                short_name: 'QNS',
                start_url: '/',
                background_color: '#7DA831',
                theme_color: '#7DA831',
                display: 'minimal-ui',
                icon: 'src/assets/img/logosvg.svg', // This path is relative to the root of the site.
            },
        },
        `gatsby-plugin-remove-serviceworker`,
        `gatsby-plugin-sitemap`,
        {
            resolve: 'gatsby-plugin-robots-txt',
            options: {
                host: 'https://qldnativeseeds.com.au',
                sitemap: [
                    'https://qldnativeseeds.com.au/sitemap.xml',
                    'https://qldnativeseeds.com.au/image-sitemap.xml'
                ],
                policy: [{ userAgent: '*', allow: '/' }]
            }
        },
        {
            resolve: `gatsby-plugin-canonical-urls`,
            options: {
              siteUrl: `https://qldnativeseeds.com.au`,
            },
        },
        {
            resolve: `gatsby-plugin-google-analytics`,
            options: {
              trackingId: "UA-150841714-1",
              head: true
            }
        },
        `gatsby-plugin-image`,
        {
            resolve: 'gatsby-plugin-material-ui',
            // If you want to use styled components you should change the injection order.
            options: {
              // stylesProvider: {
              //   injectFirst: true,
              // },
            },
        },
        `gatsby-image-sitemap`
    ]
};

//https://github.com/SirPole/google-fonts-plugin