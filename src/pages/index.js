import React from "react"
import { Link, graphql } from "gatsby"
import { Helmet } from "react-helmet"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"
import "../components/styles/index.css"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout location={location} title={siteTitle}>
      <Helmet defer={false}>
        <meta charSet="utf-8" />
        <title> El Blog de Erick Ruiz </title>{" "}
        <link rel="canonical" href="https://erickruiz-blog.netlify.app/" />
      </Helmet>{" "}
      <div className="info" id="info">
        <img
          src={require("../../content/assets/Erick_rocket.png")}
          alt="img Erick"
        />
        <div className="descrip">
          <h1>
            Bienvenido a mi blog..!
            <br /> encontraras post muy interesantes.{" "}
          </h1>{" "}
        </div>{" "}
      </div>{" "}
      <SEO title="" />{" "}
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug

        return (
          <article id="font" className="font" key={node.fields.slug}>
            <header>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link
                  style={{ boxShadow: `none`, color: `#283de2` }}
                  to={node.fields.slug}
                >
                  {" "}
                  {title}{" "}
                </Link>{" "}
              </h3>{" "}
              <small> {node.frontmatter.date} </small>{" "}
              <small>|| {node.frontmatter.readingTime} de lectura</small>{" "}
            </header>{" "}
            <section>
              <p
                id="font"
                className="font"
                dangerouslySetInnerHTML={{
                  __html: node.frontmatter.description || node.excerpt,
                }}
              />{" "}
            </section>{" "}
          </article>
        )
      })}{" "}
      <hr />
      <Bio />{" "}
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            readingTime
            tags
          }
        }
      }
    }
  }
`
