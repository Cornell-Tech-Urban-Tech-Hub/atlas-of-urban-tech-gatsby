import * as React from "react"

import { Link, graphql } from "gatsby"

// import Bio from "../components/bio"
import * as d3 from "d3"
import Layout from "../components/layout"
import Seo from "../components/seo"
import {
  Section,
  Content,
  SectionMeta,
  Row,
  Col,
} from "../styles/StyledElements"
import { CaseCardSection } from "../components/caseCardLayout"
import { contentMapMarkdown } from "../components/pageUtilities"
import { Masthead } from "../components/masthead"

const SiteIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = d3.sort(data.cases.nodes, (a, b) =>
    d3.ascending(a.frontmatter.title, b.frontmatter.title)
  )
  const markdownMap = contentMapMarkdown(data.markdown.nodes)

  const postsCS = posts.filter(d => d.frontmatter.template === "case-study")
  const postsStub = posts.filter(d => d.frontmatter.template === "stub")

  const postsFeatured = postsCS.slice(0, 3)

  console.log({ posts, postsCS, postsStub })
  console.log({ markdownMap })

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
      <Masthead />
      <SectionMeta>
        <Content>
          <Row>
            <Col>
              <div
                dangerouslySetInnerHTML={{
                  __html: markdownMap.get("intro")?.html,
                }}
              />
            </Col>
          </Row>
        </Content>
      </SectionMeta>
      <CaseCardSection nodes={postsFeatured} heading="Featured Case Studies" />
      <SectionMeta>
        <Content>
          <Row>
            <Col>
              <h2>{markdownMap.get("takeaways")?.frontmatter.title}</h2>
              <div
                dangerouslySetInnerHTML={{
                  __html: markdownMap.get("takeaways")?.html,
                }}
              />{" "}
            </Col>
          </Row>
        </Content>
      </SectionMeta>
      {/* <Section>
        <Content>
          <h2>Case Studies</h2>
          <CaseListing nodes={postsCS} />
          <h2>Stub Entries</h2>
          <CaseListing nodes={postsStub} />
        </Content>
      </Section> */}
    </Layout>
  )
}

export default SiteIndex

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
    cases: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/cases/" } }
    ) {
      nodes {
        excerpt
        fields {
          slug
        }
        id
        frontmatter {
          title
          description
          status
          template
          type
          featured_image {
            childImageSharp {
              gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
            }
          }
          featured_alt
        }
      }
    }
    markdown: allMarkdownRemark(
      filter: { frontmatter: { section: { in: ["intro"] } } }
    ) {
      nodes {
        html
        frontmatter {
          ref
          section
          title
        }
      }
    }
  }
`
