import * as React from "react"
import { Link, graphql } from "gatsby"
import styled from "styled-components"
// import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { Section, Content } from "../styles/StyledElements"

const StyledCaseList = styled.ul`
  list-style: none;
  padding-left: 0;

  h3 {
    margin-bottom: 0;
  }

  .details {
    font-size: 0.85rem;
  }
`

const StatusTag = styled.div`
  display: inline-block;
  margin-right: 4px;
  margin-bottom: 4px;

  .status {
    font-family: ${({ theme }) => theme.type.sans};
    padding: 2px 6px;
    border-radius: 4px;
    color: #fff;
    background-color: #777;
  }

  .status-draft {
    background-color: #f4d036;
  }
  .status-review {
    background-color: #eda229;
  }
  .status-complete {
    background-color: #00c0f3;
  }
`

const SiteIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes

  // if (posts.length === 0) {
  //   return (
  //     <Layout location={location} title={siteTitle}>
  //       <p>
  //         No blog posts found. Add markdown posts to "content/blog" (or the
  //         directory you specified for the "gatsby-source-filesystem" plugin in
  //         gatsby-config.js).
  //       </p>
  //     </Layout>
  //   )
  // }

  return (
    <Layout location={location} title={siteTitle}>
      <Section>
        <Content>
          <p>
            A work in process global atlas of case studies of tech-enabled urban
            districts and municipal digital masterplans
          </p>
          <h2>Case Studies</h2>
          <StyledCaseList>
            {posts.map(post => {
              const title = post.frontmatter.title || post.fields.slug

              return (
                <li key={post.fields.slug}>
                  <article
                    className="post-list-item"
                    itemScope
                    itemType="http://schema.org/Article"
                  >
                    <h3>
                      <Link to={post.fields.slug} itemProp="url">
                        <span itemProp="headline">{title}</span>
                      </Link>
                    </h3>
                    <div className="details">
                      <StatusTag>
                        <span
                          className={`status status-${post.frontmatter.status?.toLowerCase()}`}
                        >
                          {post.frontmatter.status}
                        </span>
                      </StatusTag>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: post.frontmatter.description || post.excerpt,
                        }}
                        itemProp="description"
                      />
                    </div>
                  </article>
                </li>
              )
            })}
          </StyledCaseList>
        </Content>
      </Section>
    </Layout>
  )
}

export default SiteIndex

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="All posts" />

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/cases/" } }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          title
          description
          status
        }
      }
    }
  }
`
