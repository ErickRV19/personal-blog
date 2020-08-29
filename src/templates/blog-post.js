import React from "react"
import { Link, graphql } from "gatsby"
import { kebabCase } from 'lodash';

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
  const baseUrl="https://erick-ruiz-blog.netlify.app"

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
          <small> || Categoria: <Link to={`/tags/${kebabCase(post.frontmatter.tags)}/`}>{post.frontmatter.tags}</Link></small>{" "}
          
          
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
      <hr/>
      <div className="promo">

      
      <div className="share">
        <h3>
     Comparte !!
        </h3>
        <a href={
          "http://twitter.com/share?url="+baseUrl 
        } target="_blank" rel="noopener noreferrer"> <img src={require("../../content/assets/icon-twitter.png")} alt="" srcset="" alt="twitter"/>
       </a>
         <a href={
          "http://www.facebook.com/sharer/sharer.php?u="+baseUrl
        } target="_blank" rel="noopener noreferrer"> <img src={require("../../content/assets/icon-facebook.png")} alt="" srcset="" alt="facebook"/></a>
       
      </div>
      <div className="disqus">
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
