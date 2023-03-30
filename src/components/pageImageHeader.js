import React from "react"
import styled from "styled-components"
import { StaticImage, GatsbyImage, getImage } from "gatsby-plugin-image"
import { Content, ImageCredit } from "../styles/StyledElements"
import { below } from "../styles/utilities/breakpoints"

export const ImageHeader = styled.div`
  // grid-template-columns: 3fr 1fr;
  // grid-gap: 40px
  min-height: 300px;

  .tags {
    max-width: 90%;
  }
  .title-block {
    position: relative;
  }

  h1 {
    position: absolute;
    top: 20px;
    max-width: 80%;
    padding: 0.5rem;
    span {
      padding: 0.5rem 0;
      background-color: white;
      box-shadow: 10px 0 0 white, -10px 0 0 white;
    }

    ${below.md} {
      font-size: 2rem;
    }
  }

  .image-block {
  }
`

const PageImageHeader = ({
  frontmatter,
  image,
  title,
  alt,
  credit,
  type = "case",
}) => {
  let pageImage, pageImageAlt, pageImageCredit, pageTitle

  if (type === "case") {
    pageImage = getImage(
      frontmatter.featured_image?.childImageSharp?.gatsbyImageData
    )
    pageImageAlt = frontmatter.featured_desc
      ? frontmatter.featured_desc
      : "Add Description"
    pageImageCredit = frontmatter.featured_credit
      ? frontmatter.featured_credit
      : "Add Image Credit"
    pageTitle = frontmatter.title
  } else {
    pageImage = getImage(image)
    pageImageAlt = alt ? alt : "Add Description"
    pageImageCredit = credit ? credit : "Add Image Credit"
    pageTitle = title
  }

  return (
    <ImageHeader>
      <div className="title-block">
        {/* <Img
            alt="Main Image"
            style={{ height: "360px" }}
            fluid={node.data.Image?.localFiles[0].childImageSharp?.fluid}
          /> */}
        {frontmatter.featured_image && pageImage ? (
          <GatsbyImage
            image={pageImage}
            alt={pageImageAlt}
            layout="fullWidth"
            style={{ height: "360px" }}
          />
        ) : (
          <StaticImage
            src="../assets/placeholder.png"
            alt="Placeholder"
            layout="fullWidth"
            style={{ height: "360px" }}
          />
        )}
        <ImageCredit>{pageImageCredit}</ImageCredit>
        <Content>
          <h1>
            <span>{pageTitle}</span>
          </h1>
        </Content>
      </div>
    </ImageHeader>
  )
}

export default PageImageHeader
