import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import { StaticImage, GatsbyImage, getImage } from "gatsby-plugin-image"
// const { slugFormat } = require("../utilities/slugFormat")
import { makeExcerpt } from "./pageUtilities"

export const CardBase = styled.div`
  .card-link {
    color: inherit;
    text-decoration: none;
  }
  display: flex;
  flex: auto;
  /* a:link,
  a:visited {
    color: inherit;
    text-decoration: none;
    display: flex;
    flex: auto;
  } */

  a:hover h3 span {
    transition: all 0.5s ease;
    background-color: ${({ theme }) => theme.colors.red};
    box-shadow: 10px 0 0 ${({ theme }) => theme.colors.red},
      -10px 0 0 ${({ theme }) => theme.colors.red};
    color: white;
  }

  position: relative;
  display: flex;
  flex: 1;
  /* width: 100%; */
  flex-direction: column;

  .card-inner {
    display: flex;
    flex-direction: column;
    flex: 1 auto;
  }

  /* @supports (display: grid) {
    margin-right: 0;
    margin-bottom: 0;
    width: auto;
  } */

  .card-content {
    padding: 1rem;
    background-color: #eee;
    display: flex;
    flex-direction: column;
    flex: auto;

    a:link {
    }
  }

  .card-footer {
    padding: 1rem;
  }

  .card-image {
    height: 240px;
    position: relative;
  }

  .card-summary {
    font-family: ${({ theme }) => theme.type.serif_alt};
    font-weight: 600;
  }

  /* .card-content .static {
    min-height: 5rem;
  } */

  &.full {
    background-color: #eee;
    .card-description {
      font-size: 0.9rem;
      line-height: 1.4;
      flex: auto;
    }
  }
`

export const StyledCard = styled(CardBase)`
  box-shadow: 0 2px 40px 0 rgb(0 0 0 / 7%);
  transition: box-shadow 0.3s ease-out, transform 0.3s ease-out,
    opacity 0.2s ease-out;
  transition-delay: 0.1s;
  transform: translateZ(0);

  &:hover {
    box-shadow: rgb(45 45 45 / 5%) 0px 2px 2px, rgb(49 49 49 / 5%) 0px 4px 4px,
      rgb(42 42 42 / 5%) 0px 8px 8px, rgb(32 32 32 / 5%) 0px 16px 16px,
      rgb(49 49 49 / 5%) 0px 32px 32px, rgb(35 35 35 / 5%) 0px 64px 64px;
    transform: translate(0, -4px);
    z-index: 999;
  }

  /* .card-image {
    transition: all 0.25s ease-out;
    &:hover {
      opacity: 0.7;
    }
  } */

  h3 {
    position: absolute;
    top: 20px;
    left: 20px;
    font-size: 1.6rem;
    line-height: 1.3;
    margin-top: 0;
    max-width: 80%;
    span {
      background-color: white;
      box-shadow: 10px 0 0 white, -10px 0 0 white;
      box-decoration-break: clone;
    }
  }
`

const StyledCardImpact = styled(CardBase)`
  display: flex;
  flex-direction: column;
  h3 {
    font-size: 1.6rem;
    line-height: 1.3;
    margin-top: 0;
    margin-bottom: 0.25rem;
  }

  .card-who {
    font-family: ${({ theme }) => theme.type.serif_alt};
  }

  .image-credit {
    font-size: 0.8rem;
    color: #777;
  }
`

export const CaseCard = ({ node }) => {
  //let nodePath = `/forecasts/${node.recordId}`
  //let nodePath = `/forecasts/${slugFormat(node.data.Name)}`
  let nodePath = `/cases${node.fields.slug}`

  return (
    <StyledCard>
      <Link to={nodePath} className="card-inner card-link">
        <CardImage node={node} />
        <h3>
          <span>{node.frontmatter.title}</span>
        </h3>
        <div className="card-content">
          <div className="card-summary">
            {makeExcerpt(node.frontmatter.description, 25)}
          </div>
        </div>
      </Link>
    </StyledCard>
  )
}

export const CaseCardMap = ({ node }) => {
  //let nodePath = `/forecasts/${node.recordId}`
  //let nodePath = `/forecasts/${slugFormat(node.data.Name)}`
  let nodePath = `${node.fields.slug}`

  return (
    <StyledCard>
      <Link to={nodePath} className="card-inner card-link">
        <CardImage node={node} />
        <h3>
          <span>{node.frontmatter.title}</span>
        </h3>
        <div className="card-content">
          <div className="card-summary">
            {makeExcerpt(node.frontmatter.description, 25)}
          </div>
        </div>
      </Link>
    </StyledCard>
  )
}

// export const CardImpact = ({ node }) => {
//   // const image = getImage(node.data.Image?.localFiles[0])
//   return (
//     <StyledCardImpact className="full">
//       <div className="card-inner">
//         <div className="card-header">
//           <CardImage node={node} />
//         </div>
//         <div className="card-content">
//           <h3>
//             <span>{node.data.Name}</span>
//           </h3>
//           <div className="card-who">
//             Who: <strong>{node.data.Who}</strong>
//           </div>
//           <div
//             dangerouslySetInnerHTML={{
//               __html: node.data.Description.childMarkdownRemark.html,
//             }}
//           />
//         </div>
//         <div className="card-footer image-credit">
//           {`Image: ${
//             node.data.Image_Credit ? node.data.Image_Credit : "Add Image Credit"
//           }`}
//         </div>
//       </div>
//     </StyledCardImpact>
//   )
// }

export const CardImage = ({ node }) => {
  const image = getImage(
    node.frontmatter.featured_image?.childImageSharp?.gatsbyImageData
  )
  return (
    <div className="card-image">
      {image ? (
        <GatsbyImage
          image={image}
          alt={
            node.frontmatter.featured_alt
              ? node.frontmatter.featured_alt
              : "Add Description"
          }
          style={{ height: "240px" }}
        />
      ) : (
        <StaticImage
          style={{ height: "240px" }}
          src="../assets/placeholder.png"
          alt="Placeholder"
          layout="fullWidth"
        />
      )}
    </div>
  )
}
