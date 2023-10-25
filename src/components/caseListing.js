import * as React from "react"
import { Link, graphql } from "gatsby"
import styled from "styled-components"
import {
  CaseTypeTag,
  CaseStatusTag,
  textCaseTimeframe,
} from "./caseMetaDisplay"
import datadict from "../content/data/data-dictionary.json"

const StyledCaseList = styled.ul`
  list-style: none;
  padding-left: 0;

  h3 {
    margin-bottom: 0;
  }

  .details {
    font-size: 0.85rem;
  }
`

export const CaseListing = ({ nodes }) => {
  return (
    <StyledCaseList>
      {nodes.map(post => {
        const title = post.frontmatter.title || post.fields.slug

        return (
          <li key={post.fields.slug}>
            <article
              className="post-list-item"
              itemScope
              itemType="http://schema.org/Article"
            >
              <h3>
                <Link to={post.fields.slug} itemProp="url">
                  <span itemProp="headline">{title}</span>
                </Link>
              </h3>
              <div className="details">
                <CaseStatusTag node={post} />
                <span
                  dangerouslySetInnerHTML={{
                    __html: post.frontmatter.description || post.excerpt,
                  }}
                  itemProp="description"
                />
              </div>
            </article>
          </li>
        )
      })}
    </StyledCaseList>
  )
}

const StyledCaseSet = styled.ul`
  list-style: none;
  padding-left: 0;
  a:link {
    text-decoration: none;
    color: inherit;
  }

  li {
  }

  article {
    display: flex;

    .marker {
      flex-basis: 2%;
    }

    .row-content {
      flex-grow: 1;
    }
  }

  .case-plan .marker {
    background-color: ${datadict.plan.color};
  }
  .case-district .marker {
    background-color: ${datadict.district.color};
  }
`

const StyledCaseRow = styled.li`
  background: #efefef;
  margin-top: 0.5rem;

  .row-content {
    padding: 0.25rem 0.5rem;
  }

  a:link,
  a:visited {
    color: inherit;
  }

  h3 {
    margin-top: 0;
    margin-bottom: 0;
  }

  .details {
    font-size: 0.85rem;
  }

  .metatext {
    margin-right: 0.5rem;
  }

  box-shadow: 0 2px 40px 0 rgb(0 0 0 / 7%);
  transition: box-shadow 0.3s ease-out, transform 0.3s ease-out,
    opacity 0.2s ease-out, background-color 0.3s ease-out;
  transition-delay: 0.1s;
  transform: translateZ(0);

  &:hover {
    box-shadow: rgb(45 45 45 / 5%) 0px 2px 2px, rgb(49 49 49 / 5%) 0px 4px 4px,
      rgb(42 42 42 / 5%) 0px 8px 8px, rgb(32 32 32 / 5%) 0px 16px 16px,
      rgb(49 49 49 / 5%) 0px 32px 32px, rgb(35 35 35 / 5%) 0px 64px 64px;
    transform: translate(0, -4px);
    z-index: 999;
    background-color: #cecece;
  }
`

export const CaseListingRow = ({ nodes }) => {
  return (
    <StyledCaseSet>
      {nodes.map(post => {
        const title = post.frontmatter.title || post.fields.slug

        return (
          <StyledCaseRow
            className={`case case-${post.frontmatter.type}`}
            key={post.fields.slug}
          >
            <Link to={`/cases${post.fields.slug}`} itemProp="url">
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <div className="marker">
                  {/* <CaseTypeTag node={post} /> */}
                </div>
                <div className="row-content">
                  <h3>
                    <span itemProp="headline">{title}</span>
                  </h3>
                  <div className="details">
                    <span className="metatext locaton">
                      {post.frontmatter.city}, {post.frontmatter.country_code}
                    </span>
                    &nbsp;
                    <span className="metatext timeframe">
                      {textCaseTimeframe(post)}
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          </StyledCaseRow>
        )
      })}
    </StyledCaseSet>
  )
}

const StyledTag = styled.div`
  display: inline-block;
  margin-right: 4px;
  margin-bottom: 4px;
  font-size: 0.75rem;
  font-family: ${({ theme }) => theme.type.sans};
  font-weight: 700;
  padding: 0 0.2rem;
  border-radius: 4px;
  color: #fff;
  background-color: #aaa;

  &.type-plan {
    background-color: ${datadict.plan.color};
  }
  &.type-district {
    background-color: ${datadict.district.color};
  }

  &.status-draft {
    background-color: #f4d036;
  }
  &.status-review {
    background-color: darkorange;
  }
  &.status-complete {
    background-color: #00c0f3;
  }
`

export const CaseListingRowReview = ({ nodes }) => {
  return (
    <StyledCaseSet>
      {nodes.map(post => {
        const title = post.frontmatter.title || post.fields.slug

        const type = post.frontmatter.type?.toLowerCase()
        const typelabel = datadict[type]?.labelshort
        const template = post.frontmatter.template?.toLowerCase()
        const templatelabel = datadict[template]?.label

        return (
          <StyledCaseRow
            className={`case case-${post.frontmatter.type}`}
            key={post.fields.slug}
          >
            <Link to={`/cases${post.fields.slug}`} itemProp="url">
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <div className="marker">
                  {/* <CaseTypeTag node={post} /> */}
                </div>
                <div className="row-content">
                  <h3>
                    <span itemProp="headline">{title}</span>
                  </h3>
                  <div className="details">
                    <span className="metatext locaton">
                      {post.frontmatter.city}, {post.frontmatter.country_code}
                    </span>
                    &nbsp;
                    <span className="metatext timeframe">
                      {textCaseTimeframe(post)}
                    </span>
                    <StyledTag className={`tag-type type-${type}`}>
                      {typelabel}
                    </StyledTag>
                    <StyledTag className={`tag-template template-${template}`}>
                      {" "}
                      {templatelabel}
                    </StyledTag>
                    <StyledTag
                      className={`status status-${post.frontmatter.status?.toLowerCase()}`}
                    >
                      {post.frontmatter.status}
                    </StyledTag>
                    {/* <span
            dangerouslySetInnerHTML={{
              __html: post.frontmatter.description || post.excerpt,
            }}
            itemProp="description"
          /> */}
                  </div>
                </div>
              </article>
            </Link>
          </StyledCaseRow>
        )
      })}
    </StyledCaseSet>
  )
}
