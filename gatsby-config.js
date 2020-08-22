module.exports = {
  siteMetadata: {
      title: `El blog de Erick`,
      author: {
          name: `Erick Ruiz`,
          summary: `Se constante en lo que haces, nunca te rindas hasta conseguir el objetivo.`,
      },
      description: `A starter blog demonstrating what Gatsby can do.`,
      siteUrl: `https://gatsby-starter-blog-demo.netlify.app/`,
      social: {
          twitter: `ErickRV19`,
      },
  },
  plugins: [{
          resolve: `gatsby-source-filesystem`,
          options: {
              path: `${__dirname}/content/blog`,
              name: `blog`,
          },
      },
      {
          resolve: `gatsby-source-filesystem`,
          options: {
              path: `${__dirname}/content/assets`,
              name: `assets`,
          },
      },
      {
          resolve: `gatsby-transformer-remark`,
          options: {
              plugins: [{
                      resolve: `gatsby-remark-images`,
                      options: {
                          maxWidth: 590,
                      },
                  },
                  {
                      resolve: `gatsby-remark-responsive-iframe`,
                      options: {
                          wrapperStyle: `margin-bottom: 1.0725rem`,
                      },
                  },
                  `gatsby-remark-prismjs`,
                  `gatsby-remark-copy-linked-files`,
                  `gatsby-remark-smartypants`,
              ],
          },
      },
      `gatsby-transformer-sharp`,
      `gatsby-plugin-sharp`,
      {
          resolve: `gatsby-plugin-google-analytics`,
          options: {
              trackingId: `UA-168665187-2`,
          },
      },
      `gatsby-plugin-feed`,
      {
          resolve: `gatsby-plugin-manifest`,
          options: {
              name: `Blog de Erick`,
              short_name: `Blog ERV`,
              start_url: `/`,
              background_color: `#ffffff`,
              theme_color: `#663399`,
              display: `minimal-ui`,
              icon: `content/assets/icon-leyendo.png`,
          },
      },
      `gatsby-plugin-react-helmet`,
      {
          resolve: `gatsby-plugin-typography`,
          options: {
              pathToConfigModule: `src/utils/typography`,
          },
      },
      `gatsby-plugin-offline`,
      {
          resolve: `gatsby-plugin-offline`,
          options: {
              precachePages: [`/`],
          },
      },
      // this (optional) plugin enables Progressive Web App + Offline functionality
      // To learn more, visit: https://gatsby.dev/offline
      // `gatsby-plugin-offline`,
  ],
}