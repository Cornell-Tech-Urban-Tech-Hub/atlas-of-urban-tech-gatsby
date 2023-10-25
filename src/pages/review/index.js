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

const StatusTag = styled.div`
  display: inline-block;
  margin-right: 4px;
  margin-bottom: 4px;

  .status {
    font-family: ${({ theme }) => theme.type.sans};
    padding: 2px 6px;
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

const TypeTag = styled.div`
  display: inline-block;
  margin-right: 4px;
  margin-bottom: 4px;

  font-family: ${({ theme }) => theme.type.sans};
  padding: 2px 6px;
  border-radius: 4px;
  color: #fff;
  background-color: #777;
`

const SiteIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = d3.sort(data.allMarkdownRemark.nodes, (a, b) =>
    d3.ascending(a.frontmatter.title, b.frontmatter.title)
  )

  const processed = processEntries(data.allMarkdownRemark.nodes)
  console.log(processed)

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
          <p>
            This is a temporary page to review all atlas entries. In other
            listings only posts with Status value set to "Complete will appear"
          </p>
        </Content>
      </Section>
      <Section>
        <Content>
          <h2>Tags</h2>
          <ListTagsCounted array={processed.tags} type="tags" />

          <h2>Entries</h2>

          <StyledCaseList>
            {posts.map(post => {
              const title = post.frontmatter.title || post.fields.slug

              return (
                <li key={post.fields.slug}>
                  <article
                    className="post-list-item"
                    itemScope
                    itemType="http://schema.org/Article"
                  >
                    <h4>
                      <Link to={`/cases${post.fields.slug}`} itemProp="url">
                        <span itemProp="headline">{title}</span>
                      </Link>
                    </h4>
                    <div className="details">
                      <span className="locaton">
                        {post.frontmatter.city}, {post.frontmatter.country_code}
                      </span>
                      &nbsp;
                      <span className="Timeframe">
                        {post.frontmatter.year_start} –{" "}
                        {post.frontmatter.year_completed}
                      </span>
                      <StatusTag>
                        <span
                          className={`status status-${post.frontmatter.template?.toLowerCase()}`}
                        >
                          {post.frontmatter.template}
                        </span>
                      </StatusTag>
                      <StatusTag>
                        <span
                          className={`status status-${post.frontmatter.type?.toLowerCase()}`}
                        >
                          {post.frontmatter.type}
                        </span>
                      </StatusTag>
                      <StatusTag>
                        <span
                          className={`status status-${post.frontmatter.status?.toLowerCase()}`}
                        >
                          {post.frontmatter.status}
                        </span>
                      </StatusTag>
                      {/* <span
                        dangerouslySetInnerHTML={{
                          __html: post.frontmatter.description || post.excerpt,
                        }}
                        itemProp="description"
                      /> */}
                    </div>
                  </article>
                </li>
              )
            })}
          </StyledCaseList>
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
