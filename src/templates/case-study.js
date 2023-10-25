import * as React from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import styled from "styled-components"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { Section, Content, Col, Row } from "../styles/StyledElements"
import PageImageHeader from "../components/pageImageHeader"
import { CaseProspectNote } from "../components/caseProspectNote"
import { CaseMetadata } from "../components/casePageMetadata"
import { MapCaseGeoJson } from "../components/mapCaseGeoJson"

const PageHeader = styled.header``

const CaseBodyWrapper = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
`

const CaseContent = styled.div`
  width: 90%;
  max-width: 1200px;
  margin: 1rem auto;
  /* display: grid; */
  // grid-template-columns: 3fr 1fr;
  // grid-gap: 40px
`
const CaseSidebar = styled.div`
  width: 90%;
  max-width: 1200px;
  margin: 1rem auto;
  /* display: grid; */
  // grid-template-columns: 3fr 1fr;
  // grid-gap: 40px
`

const CaseStudyTemplate = ({
  data: { site, markdownRemark: post },
  location,
}) => {
  console.log(post)
  const siteTitle = site.siteMetadata?.title || `Title`

  let featuredImg = getImage(
    post.frontmatter.featuredImage?.childImageSharp?.gatsbyImageData
  )

  let isStub = post.frontmatter.template && post.frontmatter.template === "stub"

  //console.log({ isStub })
  //console.log(post.frontmatter.tags)

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
                {isStub && <CaseProspectNote />}
              </Col>
              <Col size={1}>
                <CaseMetadata node={post} />
              </Col>
            </Row>
          </Content>
          {post.frontmatter.geography && (
            <Content>
              <Row>
                <Col>
                  <h2>Case Study Geography</h2>
                  {post.frontmatter.geography_caption && (
                    <p>{post.frontmatter.geography_caption}</p>
                  )}
                  <MapCaseGeoJson url={post.frontmatter.geography.publicURL} />
                </Col>
              </Row>
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
        type
        template
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
