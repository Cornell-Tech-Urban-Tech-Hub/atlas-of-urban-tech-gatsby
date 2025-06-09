import React, { useState, useEffect } from "react"
import { useLocation } from "@reach/router"
import { graphql, useStaticQuery } from "gatsby"
import styled from "styled-components"
import Layout from "../components/layout"
import SEO from "../components/seo"

const SearchContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`

const SearchHeader = styled.div`
  margin-bottom: 2rem;
`

const SearchQuery = styled.h1`
  font-family: ${props => props.theme.type.sans};
  font-size: 2rem;
  margin-bottom: 1rem;
`

const ResultsCount = styled.p`
  color: #666;
  margin-bottom: 2rem;
`

const ResultsList = styled.div`
  display: grid;
  gap: 2rem;
`

const ResultItem = styled.article`
  border-bottom: 1px solid #eee;
  padding-bottom: 2rem;

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

const ResultExcerpt = styled.p`
  color: #666;
  margin-bottom: 0.5rem;
`

const ResultMeta = styled.div`
  font-size: 0.9rem;
  color: #888;
`

const NoResults = styled.div`
  text-align: center;
  padding: 3rem 0;
  color: #666;
`

const SearchPage = () => {
  const location = useLocation()
  const [searchResults, setSearchResults] = useState([])
  const searchQuery = new URLSearchParams(location.search).get("q") || ""

  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark {
        nodes {
          frontmatter {
            title
            date
            tags
          }
          excerpt
          fields {
            slug
          }
        }
      }
    }
  `)

  useEffect(() => {
    if (!searchQuery) {
      setSearchResults([])
      return
    }

    const results = data.allMarkdownRemark.nodes.filter(node => {
      const searchContent = `
        ${node.frontmatter.title}
        ${node.excerpt}
        ${node.frontmatter.tags?.join(" ") || ""}
      `.toLowerCase()

      return searchContent.includes(searchQuery.toLowerCase())
    })

    setSearchResults(results)
  }, [searchQuery, data])

  return (
    <Layout location={location}>
      <SEO title={`Search: ${searchQuery}`} />
      <SearchContainer>
        <SearchHeader>
          <SearchQuery>Search Results for: {searchQuery}</SearchQuery>
          <ResultsCount>
            Found {searchResults.length} result{searchResults.length !== 1 ? "s" : ""}
          </ResultsCount>
        </SearchHeader>

        {searchResults.length > 0 ? (
          <ResultsList>
            {searchResults.map((result, index) => (
              <ResultItem key={index}>
                <ResultTitle>
                  <a href={result.fields.slug}>{result.frontmatter.title}</a>
                </ResultTitle>
                <ResultExcerpt>{result.excerpt}</ResultExcerpt>
                <ResultMeta>
                  {result.frontmatter.date}
                  {result.frontmatter.tags && (
                    <> • Tags: {result.frontmatter.tags.join(", ")}</>
                  )}
                </ResultMeta>
              </ResultItem>
            ))}
          </ResultsList>
        ) : (
          <NoResults>
            {searchQuery ? (
              <p>No results found for "{searchQuery}"</p>
            ) : (
              <p>Enter a search term to find content</p>
            )}
          </NoResults>
        )}
      </SearchContainer>
    </Layout>
  )
}

export default SearchPage 