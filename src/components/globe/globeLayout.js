import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import { GlobeVizA3 } from "./globeVizA3"
import processPostCoord from "../processPostCoord"
import { useGeoData } from "./useGeoData"

export default function GlobeLayout({ location }) {
  //const mdNode = data.allMarkdownRemark.edges[0].node

  const geoData = useGeoData()
  //console.log(geoData)

  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          title
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
            centroid
            city
            country_code
            year_start
            year_completed
            template
            type
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
  `)

  let locations = processPostCoord(data.allMarkdownRemark.nodes)
  return (
    <>
      {geoData != null && (
        <GlobeVizA3 geoData={geoData} locations={locations} />
      )}
    </>
  )
}
