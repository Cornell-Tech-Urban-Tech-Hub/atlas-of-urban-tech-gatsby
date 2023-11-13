import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import { StaticImage, GatsbyImage, getImage } from "gatsby-plugin-image"
// const { slugFormat } = require("../utilities/slugFormat")
import { makeExcerpt } from "../pageUtilities"
import datadict from "../../content/data/data-dictionary.json"
import { tint } from "polished"

const SelectionBox = styled.div`
  position: absolute;

  display: flex;
  flex: 1;
  /* width: 100%; */
  flex-direction: column;

  top: 10px;
  left: 10px;
  max-width: 200px;

  /* background-color: rgba(240, 240, 240, 0.8); */
  box-shadow: rgb(0 0 0 / 10%) 0px 5px 15px;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 400;
  border-radius: 0 6px 6px 0;
  font-family: ${props => props.theme.type.sans};

  .card-header,
  .card-content {
    padding: 5px 10px;
  }

  .meta {
    background: #efefef;
    font-size: 0.8rem;
  }

  .type {
    text-transform: uppercase;
    font-size: 0.8rem;
  }
  .name {
    font-family: ${props => props.theme.type.sans};
    font-weight: 700;
    line-height: 1.2;
  }
  .summary {
    line-height: 1.2;
    font-size: 0.8rem;
    margin-bottom: 0.5rem;
  }

  .close {
    margin-right: 0.5rem;
    border-radius: 0.5rem;
    border: 1px solid ${({ theme }) => theme.colors.coolgrey};
    cursor: pointer;
    background: none;
    transition: all 0.5s ease;
    :hover {
      background: ${({ theme }) => theme.colors.coolgrey};
      color: #fff;
    }
  }

  .node-link {
    text-decoration: none;
    transition: all 0.5s ease;
    :hover {
      text-decoration: underline;
    }
  }

  &.type-plan {
    border-left: 4px solid ${datadict.plan.color};
    background-color: lighten(0.2, ${datadict.plan.color});
  }
  &.type-district {
    border-left: 4px solid ${datadict.district.color};
    background-color: lighten(0.2, ${datadict.district.color});
  }
`

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
`

export const GlobeCaseCard = ({ selectedPoint, handleClose }) => {
  let frontmatter = selectedPoint?.properties?.frontmatter

  const type = frontmatter.type?.toLowerCase()
  const typelabel = datadict[type]?.labelshort
  const template = frontmatter.template?.toLowerCase()
  const templatelabel = datadict[template]?.label

  return (
    <SelectionBox id="nodeSelected" className={`type-${type}`}>
      <div className="card-content tags">
        {/* <div className="type">{selectedPoint.type}</div> */}{" "}
        <StyledTag className={`tag-type type-${type}`}>{typelabel}</StyledTag>
        <StyledTag className={`tag-template template-${template}`}>
          {templatelabel}
        </StyledTag>
      </div>
      <div className="card-header">
        {/* <CardImage node={selectedPoint} /> */}
        <div className={"name"}>{frontmatter.title}</div>
      </div>

      <div className="card-content meta">
        <div className="locaton">
          {frontmatter.city}, {frontmatter.country_code}
        </div>
      </div>
      <div className={"card-content summary"}>
        {frontmatter.description !== null && (
          <>{makeExcerpt(frontmatter.description, 25)}</>
        )}
      </div>
      <div className="card-content actions">
        <button
          className="close"
          onClick={e => {
            handleClose()
            // console.log("close SelectionBox")
            //document.getElementById("nodeSelected").style.display = "none"
          }}
        >
          close
        </button>
        <Link
          className="node-link"
          to={`cases${selectedPoint?.properties?.fields?.slug}`}
        >
          View Page
        </Link>
      </div>
    </SelectionBox>
  )
}

// const StyledTagType = styled(StyledTag)``

// export const CaseTypeTag = ({ node }) => {
//   const classtext = node.properties.frontmatter.type?.toLowerCase()
//   const label = datadict[node.properties.frontmatter.type]?.labelshort

//   return
// }

export const CardImage = ({ node }) => {
  const image = getImage(
    node.properties.frontmatter.featured_image?.childImageSharp?.gatsbyImageData
  )
  return (
    <div className="card-image">
      {image ? (
        <GatsbyImage
          image={image}
          alt={
            node.properties.frontmatter.featured_alt
              ? node.properties.frontmatter.featured_alt
              : "Add Description"
          }
          style={{ height: "120px" }}
        />
      ) : (
        <StaticImage
          style={{ height: "120px" }}
          src="../../assets/placeholder.png"
          alt="Placeholder"
          layout="fullWidth"
        />
      )}
    </div>
  )
}
