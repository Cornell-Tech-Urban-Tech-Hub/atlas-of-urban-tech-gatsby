import * as React from "react"
import { Link, graphql } from "gatsby"
import styled from "styled-components"
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
  const posts = d3.sort(data.cases.nodes, (a, b) =>
    d3.ascending(a.frontmatter.title, b.frontmatter.title)
  )
  const markdownMap = contentMapMarkdown(data.markdown.nodes)
  const searchContainerRef = React.useRef(null)

  const postsCS = posts.filter(d => d.frontmatter.template === "case-study")
  // const postsStub = posts.filter(d => d.frontmatter.template === "stub")

  const postsFeatured = getRandomPosts(postsCS, 3)

  // Get search query from URL
  const searchParams = new URLSearchParams(location.search)
  const searchQuery = searchParams.get("q") || ""

  // Scroll to search results when search query changes
  React.useEffect(() => {
    if (searchQuery && searchContainerRef.current) {
      searchContainerRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [searchQuery])

  // Function to convert markdown to plaintext
  const markdownToPlaintext = (markdown) => {
    if (!markdown) return ""
    return markdown
      .replace(/<!--[\s\S]*?-->/g, '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/!\[([^\]]*)\]\([^)]+\)/g, '')
      .replace(/#{1,6}\s/g, '')
      .replace(/(\*\*|__)(.*?)\1/g, '$2')
      .replace(/(\*|_)(.*?)\1/g, '$2')
      .replace(/```[\s\S]*?```/g, '')
      .replace(/`([^`]+)`/g, '$1')
      .replace(/^\s*>\s*/gm, '')
      .replace(/^[-*_]{3,}$/gm, '')
      .replace(/^[-*+]\s+/gm, '')
      .replace(/^\d+\.\s+/gm, '')
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
      <Section>
        <Content>
          <SearchContainer ref={searchContainerRef}>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                const formData = new FormData(e.target)
                const query = formData.get("search")
                if (query) {
                  window.location.href = `/?q=${encodeURIComponent(query)}`
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
            <>
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
            </>
          )}
        </Content>
      </Section>
    </Layout>
  )
}

export default SiteIndex

export const Head = () => <Seo />

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
    cases: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/cases/" }
        frontmatter: { status: { eq: "Complete" } }
      }
    ) {
      nodes {
        excerpt
        rawMarkdownBody
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
          tags
          city
          country_code
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

function getRandomPosts(arr, num) {
  // const shuffled = [...arr].sort(() => 0.5 - Math.random())
  // return shuffled.slice(0, num)
  return [...arr].sort(() => 0.5 - Math.random()).slice(0, num)
}
