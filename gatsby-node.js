const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const _ = require("lodash")

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`src/templates/blog-post.js`)
  const tagTemplate = path.resolve(`src/templates/tagsTemplate.js`);
  const result = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                tags
                title
              }
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }
  // Create blog posts pages.
  const posts = result.data.allMarkdownRemark.edges

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node

    createPage({
      path: post.node.fields.slug,
      component: blogPost,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    })
  })
    // create Tags pages    // pulled directly from https://www.gatsbyjs.org/docs/adding-tags-and-categories-to-blog-posts/#add-tags-to-your-markdown-files
  let tags = [];    // Iterate through each post, putting all found tags into `tags`  
    _.each(posts, edge => {      
      if (_.get(edge, 'node.frontmatter.tags')) {        
        tags = tags.concat(edge.node.frontmatter.tags);      
      }    
    });  
      // Eliminate duplicate tags
         tags = _.uniq(tags);   
          // Make tag pages   
          tags.forEach(tag => {      
            createPage({        
              path: `/tags/${_.kebabCase(tag)}/`,        
              component: tagTemplate,        
              context: {          
                tag,        
              },      
            });    
          });
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

