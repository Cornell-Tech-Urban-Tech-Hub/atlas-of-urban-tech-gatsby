import * as React from "react"
import { Link, graphql } from "gatsby"
import styled from "styled-components"
// import Bio from "../components/bio"
import * as d3 from "d3"
import Layout from "../../components/layout"
import Seo from "../../components/seo"
import { Section, Content } from "../../styles/StyledElements"
import processEntries from "../../components/processEntries"
import { ListTagsCounted } from "../../components/listTags"
import { CaseListingRowReview } from "../../components/caseListing"

const SiteIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = d3.sort(data.allMarkdownRemark.nodes, (a, b) =>
    d3.ascending(a.frontmatter.title, b.frontmatter.title)
  )

  const processed = processEntries(data.allMarkdownRemark.nodes)

  const postsCS = posts.filter(d => d.frontmatter.template === "case-study")
  const postsStub = posts.filter(d => d.frontmatter.template === "stub")

  // console.log({ posts, postsCS, postsStub })

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
      <Seo title={"Review Index"} />
      <Section>
        <Content>
          <h1>Review Index</h1>
        </Content>
      </Section>
      <Section>
        <Content>
          <h2>Tags</h2>
          <ListTagsCounted array={processed.tags} type="tags" />

          <h2>Entries</h2>
          <CaseListingRowReview nodes={posts} />
        </Content>
      </Section>
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
    allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/atlas/cases/" }
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
        }
      }
    }
  }
`
