import * as React from "react"
import { Link, graphql } from "gatsby"
import styled from "styled-components"
// import Bio from "../components/bio"
import * as d3 from "d3"
import Layout from "../components/layout"
import Seo from "../components/seo"
import {
  PageHeader,
  Section,
  Content,
  Row,
  Col,
} from "../styles/StyledElements"
import processEntries from "../components/processEntries"
import { CaseCardsSet } from "../components/caseCardLayout"
import { CaseListingRow } from "../components/caseListing"
import { PageSimpleHeader } from "../components/pageSimpleHeader"

const StyledCaseList = styled.ul`
  list-style: none;
  padding-left: 0;
  a {
    text-decoration: none;
  }

  li {
    background: #efefef;
    margin-top: 0.25rem;
    padding: 0.25rem 0.5rem;
  }

  h4 {
    margin-top: 0;
    margin-bottom: 0;
  }

  .details {
    font-size: 0.85rem;
  }
`

const Stubs = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = d3.sort(data.allMarkdownRemark.nodes, (a, b) =>
    d3.ascending(a.frontmatter.title, b.frontmatter.title)
  )
  const mdNode = data.page.edges[0].node
  //const processed = processEntries(data.allMarkdownRemark.nodes)
  //const postsCS = posts.filter(d => d.frontmatter.template === "case-study")
  const postsStub = posts.filter(d => d.frontmatter.template === "stub")

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title={mdNode.frontmatter.title} />
      <PageSimpleHeader title={mdNode.frontmatter.title}></PageSimpleHeader>
      <Section>
        <Content>
          <Row>
            <Col>
              <div
                dangerouslySetInnerHTML={{
                  __html: mdNode.html,
                }}
              />
            </Col>
          </Row>
        </Content>
      </Section>
      <Section>
        <Content>
          {/* <CaseCardsSet nodes={postsCS} /> */}
          <Row>
            <Col>
              <CaseListingRow nodes={postsStub} />{" "}
            </Col>
          </Row>
        </Content>
      </Section>
    </Layout>
  )
}

export default Stubs

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
// export const Head = () => <Seo title="Case Study Stubs" />

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
    page: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/page-prospects.md/" } }
    ) {
      edges {
        node {
          html
          fileAbsolutePath
          frontmatter {
            title
          }
        }
      }
    }
    allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/cases/" }
        frontmatter: { status: { eq: "Complete" } }
      }
    ) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          title
          description
          status
          template
          type
          tags
          city
          country_code
          year_start
          year_completed
          featured_image {
            childImageSharp {
              gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
            }
          }
          featured_alt
        }
        id
      }
    }
  }
`
