import * as React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allNotionArticle.nodes
  console.log(data)
  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Seo title="All posts" />
        <Bio />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="All posts" />
      <Bio />
      <ol style={{ listStyle: `none` }}>
        {posts.map(post => {
          const { title, id, published, updatedAt, category, tags, author, internal } = post

          if (!published) return

          return (
            <li key={id}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  <h2>
                    <Link to={title} itemProp="url">
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </h2>
                  <small>{new Date(updatedAt).toLocaleDateString()}</small>
                </header>
                <section>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: internal.description || ' ',
                    }}
                    itemProp="description"
                  />
                  <p
                    dangerouslySetInnerHTML={{
                      __html: author.name || ' ',
                    }}
                    itemProp="author"
                  />
                </section>
              </article>
            </li>
          )
        })}
      </ol>
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
    allNotionArticle {
      nodes {
        title
        id
        published
        updatedAt
        archived
        category {
          name
        }
        tags {
          name
        }
        author {
          name
        }
        internal {
          description
          content
        }
      }
    }
  }
`
