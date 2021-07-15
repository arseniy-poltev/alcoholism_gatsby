require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

let contentfulConfig = {
  spaceId: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
}

if (process.env.HTTPS_PROXY) {
  const host = process.env.HTTPS_PROXY.split(":")[0]
  const port = process.env.HTTPS_PROXY.split(":")[1]
  contentfulConfig.proxy = {
    host,
    port,
  }
}

console.log("contentfulConfig", contentfulConfig)

if (process.env.CONTENTFUL_HOST) {
  contentfulConfig.host = process.env.CONTENTFUL_HOST
}

const { spaceId, accessToken } = contentfulConfig

if (!spaceId || !accessToken) {
  throw new Error(
    "Contentful spaceId and the access token need to be provided."
  )
}

module.exports = {
  siteMetadata: {
    title: `Alcoholism`,
    description: `Alcoholism.org web app`,
    author: `Robert Popescu`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/Images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `alcoholism.org`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/assets/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    "gatsby-plugin-sass",
    // {
    //   resolve: "gatsby-plugin-sass",
    //   options: {
    //     sassOptions: {
    //       includePaths: ["src/images"],
    //     },
    //     // data: `@import "${__dirname}/src/styles/styles";`, // global styles
    //   },
    // },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /Icons/,
        },
      },
    },
    `gatsby-plugin-gatsby-cloud`,
    `@contentful/gatsby-transformer-contentful-richtext`,
    {
      resolve: "gatsby-source-contentful",
      options: contentfulConfig,
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
