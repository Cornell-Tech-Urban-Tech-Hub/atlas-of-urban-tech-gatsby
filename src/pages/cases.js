import * as React from "react"
import { graphql } from "gatsby"
import styled from "styled-components"
// import Bio from "../components/bio"
import * as d3 from "d3"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { Section, Content, Row, Col } from "../styles/StyledElements"
import processEntries from "../components/processEntries"
import { CaseCardsSet } from "../components/caseCardLayout"
import { PageSimpleHeader } from "../components/pageSimpleHeader"
import { useLocation } from "@reach/router"

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

const SearchContainer = styled.div`
  margin: 2rem 0;
`

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  font-size: 1.1rem;
  border: 2px solid #ddd;
  border-radius: 4px;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.red};
  }
`

const SiteIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = d3.sort(data.allMarkdownRemark.nodes, (a, b) =>
    d3.ascending(a.frontmatter.title, b.frontmatter.title)
  )
  const mdNode = data.page.edges[0].node
  //const processed = processEntries(data.allMarkdownRemark.nodes)

  const postsCS = posts.filter(d => d.frontmatter.template === "case-study")
  //const postsStub = posts.filter(d => d.frontmatter.template === "stub")

  // Get search query from URL
  const searchParams = new URLSearchParams(location.search)
  const searchQuery = searchParams.get("q") || ""

  // Filter cases based on search query
  const filteredCases = searchQuery
    ? postsCS.filter(node => {
        const searchContent = `
          ${node.frontmatter.title}
          ${node.frontmatter.description}
          ${node.frontmatter.tags?.join(" ") || ""}
          ${node.frontmatter.city}
          ${node.frontmatter.country_code}
        `.toLowerCase()
        return searchContent.includes(searchQuery.toLowerCase())
      })
    : postsCS

  return (
    <Layout location={location} title={siteTitle}>
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
          <SearchContainer>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                const formData = new FormData(e.target)
                const query = formData.get("search")
                if (query) {
                  window.location.href = `/cases?q=${encodeURIComponent(query)}`
                }
              }}
            >
              <SearchInput
                type="text"
                name="search"
                placeholder="Search cases by title, description, tags, or location..."
                defaultValue={searchQuery}
              />
            </form>
          </SearchContainer>
          {searchQuery && (
            <Row>
              <Col>
                <p>
                  Found {filteredCases.length} case{filteredCases.length !== 1 ? "s" : ""} for "{searchQuery}"
                </p>
              </Col>
            </Row>
          )}
          <CaseCardsSet nodes={filteredCases} />
          {/* <Row>
            <Col>
              <CaseListingRow nodes={postsCS} />{" "}
            </Col>
          </Row> */}
        </Content>
      </Section>
    </Layout>
  )
}

export default SiteIndex

export const Head = () => <Seo title={"Case Studies"} />

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
    page: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/page-cases.md/" } }
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
        id
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
      }
    }
  }
`
