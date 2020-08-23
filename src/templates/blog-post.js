import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"
import {DiscussionEmbed} from 'disqus-react'


const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title
  const { previous, next } = pageContext
  
  const disqusShortName='https-erick-ruiz-blog-netlify-app'
  const disqusConfig={
    identifier: data.markdownRemark.id,
    title:post.title,
  }

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />{" "}
      <article id="font" className="font">
        <header>
          <h1
            style={{
              marginTop: rhythm(1),
              marginBottom: 0,
            }}
          >
            {" "}
            {post.frontmatter.title}{" "}
          </h1>{" "}
          <small> {post.frontmatter.date} </small>{" "}
          <small> || {post.frontmatter.readingTime} de lectura</small>{" "}
        </header>{" "}
         <br/>
        <section dangerouslySetInnerHTML={{ __html: post.html }} />{" "}
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />{" "}
        <footer>
          <Bio />
        </footer>{" "}
      </article>{" "}
      <nav>
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {" "}
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                {" "}
                ← {previous.frontmatter.title}{" "}
              </Link>
            )}{" "}
          </li>{" "}
          <li>
            {" "}
            {next && (
              <Link to={next.fields.slug} rel="next">
                {" "}
                {next.frontmatter.title}→{" "}
              </Link>
            )}{" "}
          </li>{" "}
        </ul>{" "}
      </nav>{" "}
      <div className="promo">

      
      <div className="share">
        <h3>
     Comparte el blog.!
        </h3>
      </div>
      <div className="disqus">
        <h3> 
        No olvides reaccionar al post y dejar tu comentario, lo estare leyendo.
        </h3>
        <DiscussionEmbed shortname={disqusShortName} config={disqusConfig}/>
      </div>
      </div>
    </Layout>
  )
}
export default BlogPostTemplate


export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        readingTime
        tags
      }
    }
  }
`
