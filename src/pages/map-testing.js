import * as React from "react"
import { Link, graphql } from "gatsby"
import styled from "styled-components"
// import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { Section, Content } from "../styles/StyledElements"
import { GlobeMarker } from "../components/globeMarker"
import { Globe } from "../components/globeMarker"
import MapWorld from "../components/mapWorld"

const StyledCaseList = styled.ul`
  list-style: none;
  padding-left: 0;

  .details {
    font-size: 0.85rem;
  }
`

const StatusTag = styled.div`
  display: inline-block;
  padding: 0px 6px;
  margin-right: 4px;
  margin-bottom: 4px;
  border-radius: 4px;
  background: #ddd;
`

const PageMapTesting = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes

  return (
    <Layout location={location} title={siteTitle}>
      <Section>
        <Content>
          <h2>Additional Map Testing</h2>
          <GlobeMarker centroid={[40.712778, -74.006111]} />
          {/* <Globe /> */}
          <MapWorld />
          {/* <StyledCaseList>
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
                    <div class="details">
                      <StatusTag class="status">
                        {post.frontmatter.status}
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
          </StyledCaseList> */}
        </Content>
      </Section>
    </Layout>
  )
}

export default PageMapTesting

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
