import * as React from "react"
import { Link, graphql } from "gatsby"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import styled from "styled-components"
// import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { Section, Content } from "../styles/StyledElements"

const StatusTag = styled.div`
  display: inline-block;
  padding: 0px 6px;
  margin-right: 4px;
  margin-bottom: 4px;
  border-radius: 4px;
  background: #ddd;
`

const PageMap = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes

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

  const isLatitude = num => isFinite(num) && Math.abs(num) <= 90
  const isLongitude = num => isFinite(num) && Math.abs(num) <= 180
  let checkPosts = posts.map(post => {
    let valid = false
    let centroid = post.frontmatter.centroid
    console.log(centroid)
    if (centroid) {
      let lon = centroid[0]
      let lat = centroid[1]
      if (isLongitude(lon) && isLatitude(lat)) {
        valid = true
      }
    }
    post.validCoordinate = valid

    return post
  })
  console.log(checkPosts)
  let postsValid = checkPosts.filter(d => d.validCoordinate)
  let postsInvalid = checkPosts.filter(d => !d.validCoordinate)

  return (
    <Layout location={location} title={siteTitle}>
      <Section>
        <Content>
          <h2>Map View</h2>

          <MapContainer
            style={{ height: "600px" }}
            center={[0, 0]}
            zoom={2}
            scrollWheelZoom={false}
          >
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
              attribution={`&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`}
            />
            {postsValid.map(post => {
              const title = post.frontmatter.title || post.fields.slug

              return (
                <Marker position={post.frontmatter.centroid}>
                  <Popup>
                    <h3>
                      <Link to={post.fields.slug} itemProp="url">
                        <span itemProp="headline">{title}</span>
                      </Link>
                    </h3>
                    <div className="details">
                      <StatusTag className="status">
                        {post.frontmatter.status}
                      </StatusTag>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: post.frontmatter.description || post.excerpt,
                        }}
                        itemProp="description"
                      />
                    </div>{" "}
                  </Popup>
                </Marker>
              )
            })}
          </MapContainer>
        </Content>
        <Content>
          {postsInvalid.length > 0 && (
            <>
              <h4>
                Case studies missing valid centroid coordinate in post
                frontmatter
              </h4>
              <ul>
                {postsInvalid.map(post => {
                  const title = post.frontmatter.title || post.fields.slug
                  return (
                    <li>
                      <Link to={post.fields.slug} itemProp="url">
                        {title}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </>
          )}
        </Content>
      </Section>
    </Layout>
  )
}

export default PageMap

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="All posts" />

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
          centroid
        }
      }
    }
  }
`
