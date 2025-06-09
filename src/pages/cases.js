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
import { Link } from "gatsby"

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

const SearchResultsList = styled.div`
  margin-top: 2rem;
`

const SearchResultItem = styled.article`
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }
`

const ResultTitle = styled.h2`
  font-family: ${props => props.theme.type.sans};
  font-size: 1.5rem;
  margin-bottom: 0.5rem;

  a {
    color: ${props => props.theme.colors.red};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`

const ResultMeta = styled.div`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.5rem;
`

const ResultExcerpt = styled.div`
  color: #333;
  line-height: 1.6;
`

const HighlightedText = styled.span`
  background-color: ${props => props.theme.colors.red}20;
  padding: 0 2px;
  border-radius: 2px;
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

  // Function to convert markdown to plaintext
  const markdownToPlaintext = (markdown) => {
    if (!markdown) return ""
    return markdown
      // Remove HTML comments
      .replace(/<!--[\s\S]*?-->/g, '')
      // Remove markdown links but keep the text
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      // Remove markdown images
      .replace(/!\[([^\]]*)\]\([^)]+\)/g, '')
      // Remove markdown headers
      .replace(/#{1,6}\s/g, '')
      // Remove markdown emphasis
      .replace(/(\*\*|__)(.*?)\1/g, '$2')
      .replace(/(\*|_)(.*?)\1/g, '$2')
      // Remove markdown code blocks
      .replace(/```[\s\S]*?```/g, '')
      // Remove inline code
      .replace(/`([^`]+)`/g, '$1')
      // Remove blockquotes
      .replace(/^\s*>\s*/gm, '')
      // Remove horizontal rules
      .replace(/^[-*_]{3,}$/gm, '')
      // Remove list markers
      .replace(/^[-*+]\s+/gm, '')
      .replace(/^\d+\.\s+/gm, '')
      // Remove extra whitespace
      .replace(/\n\s*\n/g, '\n\n')
      .trim()
  }

  // Function to highlight matched text
  const highlightText = (text, query) => {
    if (!query) return text
    const regex = new RegExp(`(${query})`, 'gi')
    return text.split(regex).map((part, i) => 
      regex.test(part) ? <HighlightedText key={i}>{part}</HighlightedText> : part
    )
  }

  // Function to get excerpt with context around match
  const getExcerpt = (text, query) => {
    if (!query) return text
    const plaintext = markdownToPlaintext(text)
    const index = plaintext.toLowerCase().indexOf(query.toLowerCase())
    if (index === -1) return plaintext.substring(0, 200) + '...'
    
    const start = Math.max(0, index - 100)
    const end = Math.min(plaintext.length, index + query.length + 100)
    const excerpt = plaintext.substring(start, end)
    return (start > 0 ? '...' : '') + excerpt + (end < plaintext.length ? '...' : '')
  }

  // Filter cases based on search query
  const filteredCases = searchQuery
    ? postsCS.filter(node => {
        const searchContent = `
          ${node.frontmatter.title}
          ${node.frontmatter.description}
          ${node.frontmatter.tags?.join(" ") || ""}
          ${node.frontmatter.city}
          ${node.frontmatter.country_code}
          ${markdownToPlaintext(node.rawMarkdownBody)}
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
                placeholder="Search cases by title, description, content, tags, or location..."
                defaultValue={searchQuery}
              />
            </form>
          </SearchContainer>
          {searchQuery ? (
            <>
              <Row>
                <Col>
                  <p>
                    Found {filteredCases.length} case{filteredCases.length !== 1 ? "s" : ""} for "{searchQuery}"
                  </p>
                </Col>
              </Row>
              <SearchResultsList>
                {filteredCases.map((node) => (
                  <SearchResultItem key={node.id}>
                    <ResultTitle>
                      <Link to={`/cases${node.fields.slug}`}>
                        {highlightText(node.frontmatter.title, searchQuery)}
                      </Link>
                    </ResultTitle>
                    <ResultMeta>
                      {node.frontmatter.city && `${node.frontmatter.city}, `}
                      {node.frontmatter.country_code}
                      {node.frontmatter.tags && (
                        <> • Tags: {node.frontmatter.tags.join(", ")}</>
                      )}
                    </ResultMeta>
                    <ResultExcerpt>
                      {highlightText(
                        getExcerpt(node.rawMarkdownBody, searchQuery),
                        searchQuery
                      )}
                    </ResultExcerpt>
                  </SearchResultItem>
                ))}
              </SearchResultsList>
            </>
          ) : (
            <CaseCardsSet nodes={postsCS} />
          )}
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
        rawMarkdownBody
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
