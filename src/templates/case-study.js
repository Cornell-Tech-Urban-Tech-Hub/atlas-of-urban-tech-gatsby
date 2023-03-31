import * as React from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import styled from "styled-components"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { Section, Content, Col, Row } from "../styles/StyledElements"
import PageImageHeader from "../components/pageImageHeader"
import { ListTagsSimple } from "../components/listTags"
import { GlobeMarker } from "../components/globeMarker"

import { MapCaseGeoJson } from "../components/mapCaseGeoJson"

const PageHeader = styled.header``

const Metadata = styled.div`
  font-size: 0.9rem;
  h4 {
    color: #999;
    margin-bottom: 0.25rem;
  }

  .centroids {
    font-size: 0.75rem;
    color: #999;
  }
`

const Status = styled.div`
  font-family: ${({ theme }) => theme.type.sans};
  font-weight: bold;
  .status {
    display: inline-block;
    padding: 0px 6px;
    margin-right: 4px;
    margin-bottom: 4px;
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

const CaseStudyTemplate = ({
  data: { site, markdownRemark: post },
  location,
}) => {
  const siteTitle = site.siteMetadata?.title || `Title`

  let featuredImg = getImage(
    post.frontmatter.featuredImage?.childImageSharp?.gatsbyImageData
  )

  console.log(post.frontmatter.tags)

  return (
    <Layout location={location} title={siteTitle}>
      <article
        className="case-study"
        itemScope
        itemType="http://schema.org/Article"
      >
        <PageHeader>
          <PageImageHeader frontmatter={post.frontmatter} />
        </PageHeader>
        <Section>
          <Content>
            <Row collapse={"lg"}>
              <Col size={3} className="details">
                <section
                  dangerouslySetInnerHTML={{ __html: post.html }}
                  itemProp="articleBody"
                />
              </Col>
              <Col size={1}>
                <Metadata>
                  <h4>Status</h4>
                  {post.frontmatter.author ? (
                    <Status>
                      <div
                        class={`status status-${post.frontmatter.status?.toLowerCase()}`}
                      >
                        {post.frontmatter.status}
                      </div>
                    </Status>
                  ) : (
                    <div class="note-missing">Add Status</div>
                  )}

                  <h4>Author</h4>
                  <div>
                    {post.frontmatter.author ? (
                      post.frontmatter.author
                    ) : (
                      <div class="note-missing">Add Author</div>
                    )}
                  </div>
                  <h4>Timeframe</h4>

                  {post.frontmatter.year_start ? (
                    <div>
                      {post.frontmatter.year_start}
                      {post.frontmatter.year_completed &&
                        `—${post.frontmatter.year_completed}`}
                    </div>
                  ) : (
                    <div class="note-missing">
                      Add Year Started (and completed if applicable)
                    </div>
                  )}

                  <h4>Tags</h4>
                  {post.frontmatter.tags &&
                  post.frontmatter.tags?.length > 0 ? (
                    <ListTagsSimple array={post.frontmatter.tags} type="Tags" />
                  ) : (
                    <div class="note-missing">No Tags Specified</div>
                  )}

                  <h4>Location</h4>

                  {post.frontmatter.city && post.frontmatter.country_code ? (
                    <div>
                      <strong>
                        {post.frontmatter.city}, {post.frontmatter.country_code}
                      </strong>
                    </div>
                  ) : (
                    <div class="note-missing">
                      Add City and ISO 3-Letter Country Code
                    </div>
                  )}
                  {post.frontmatter.centroid ? (
                    <>
                      <div>
                        <GlobeMarker centroid={post.frontmatter.centroid} />
                      </div>
                      <div class="centroids">
                        Lat: {post.frontmatter.centroid[0]}, Lon:
                        {post.frontmatter.centroid[1]}
                      </div>
                    </>
                  ) : (
                    <div class="note-missing">No Centroid Specified</div>
                  )}
                </Metadata>
              </Col>
            </Row>
          </Content>
          {post.frontmatter.geography && (
            <Content>
              <h2>Case Study Geography</h2>
              {post.frontmatter.geography_caption && (
                <p>{post.frontmatter.geography_caption}</p>
              )}
              <MapCaseGeoJson url={post.frontmatter.geography.publicURL} />
            </Content>
          )}
        </Section>
      </article>
    </Layout>
  )
}

export const Head = ({ data: { markdownRemark: post } }) => {
  return (
    <Seo
      title={post.frontmatter.title}
      description={post.frontmatter.description || post.excerpt}
    />
  )
}

export default CaseStudyTemplate

export const pageQuery = graphql`
  query CasesPostBySlug($id: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        status
        author
        description
        city
        country_code
        year_start
        year_completed
        centroid
        tags
        featured_image {
          childImageSharp {
            # gatsbyImageData(width: 800)
            gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
          }
        }
        featured_alt
        featured_credit
        geography {
          publicURL
        }
        geography_caption
      }
    }
  }
`
