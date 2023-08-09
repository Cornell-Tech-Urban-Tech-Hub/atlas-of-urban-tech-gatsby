import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import { GlobeVizA2 } from "./globeVizA2"
import processPostCoord from "../components/processPostCoord"
import { useGeoData } from "../components/useGeoData"

const Header = ({ data }) => (
  <header>
    <h1>{data.site.siteMetadata.title}</h1>
  </header>
)

export default function GlobeLayoutA2({ location }) {
  //const mdNode = data.allMarkdownRemark.edges[0].node

  const geoData = useGeoData()
  console.log(geoData)

  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          title
        }
      }
      allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/cases/" } }) {
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
          }
        }
      }
    }
  `)

  let locations = processPostCoord(data.allMarkdownRemark.nodes)
  console.log(locations.valid)

  return (
    <>
      {geoData != null && (
        <GlobeVizA2 geoData={geoData} locations={locations} />
      )}

      {/* {locations.valid.map(loc => {
        const title = loc.frontmatter.title || loc.fields.slug

        return (
          <li key={loc.fields.slug}>
            <Link to={loc.fields.slug} itemProp="url">
              <span itemProp="headline">{title}</span>
            </Link>
          </li>
        )
      })} */}
    </>
  )
}
